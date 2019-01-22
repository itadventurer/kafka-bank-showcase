import pg from 'pg';
import squel from 'squel';
import kafka_utils from './kafka_utils';
const debug = require('debug')('showcase:debug:transactions-connector');

const cards_topic = process.env.CARDS_LOG;
const transactions_topic = process.env.TRANSACTIONS_LOG;

async function consume_event(pg_client, event) {
    const payload = event.payload;
    debug(`received transaction for card ${event.cardid}`);
    await pg_client.query('BEGIN');
    try {
        switch(event.event) {
        case 'add_card':
            const add_card_query = squel.insert()
                .into('cards')
                .setFields({cardid: event.cardid,
                            cardholder: payload.cardholder_name,
                            card_limit: payload.limit,
                            is_blocked: payload.blocked,
                            is_cancelled: false
                           })
                .toString();
            await pg_client.query(add_card_query);
            break;
        case 'block_card':
            const block_card_query = squel.update()
                .table('cards')
                .where("cardid = ?", event.cardid)
                .set('is_blocked', true)
                .toString();
            await pg_client.query(block_card_query);
            break;
        case 'unblock_card':
            const unblock_card_query = squel.update()
                .table('cards')
                .where("cardid = ?", event.cardid)
                .set('is_blocked', false)
                .toString();
            await pg_client.query(unblock_card_query);
            break;
        case 'update_card_limit':
            const update_card_limit_query = squel.update()
                .table('cards')
                .where("cardid = ?", event.cardid)
                .set('card_limit', payload)
                .toString();
            await pg_client.query(update_card_limit_query);
            break;
        case 'cancel_cards':
            const cancel_cards_query = squel.update()
                .table('cards')
                .where("cardid = ?", event.cardid)
                .set('is_cancelled', true)
                .toString();
            await pg_client.query(cancel_cards_query);
            break;
        case "transaction":
            const transaction_query = squel.insert()
                .into('transactions')
                .setFields({cardid: event.cardid,
                            transaction_timestamp: event.timestamp,
                            amount: payload.amount,
                           })
                .toString();
            await pg_client.query(transaction_query);
            break;
        default:
            console.error(event.timestamp, 'Unknown event:', event);
        }
        await pg_client.query('COMMIT');
    } catch(e) {
        console.error(e);
        pg_client.query('ROLLBACK');
    }
}

async function consume() {
    const consumer = kafka_utils.create_consumer(process.env.KAFKA_URL, 'cards_connector', [cards_topic, transactions_topic]);

    const pg_client = new pg.Client()
    await pg_client.connect()
    kafka_utils.consume_messages(consumer, event => consume_event(pg_client,event));
    debug(`Started listening on topics ${cards_topic} and ${transactions_topic}`);
}
consume();
