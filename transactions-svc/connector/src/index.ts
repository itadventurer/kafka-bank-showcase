import pg from 'pg';
import squel from 'squel';
import kafka_utils from './kafka_utils';
const debug = require('debug')('showcase:debug:transactions-connector');

const source_topic = process.env.TRANSACTIONS_LOG;

async function consume_event(pg_client, event) {
    const payload = event.payload;
    debug(`received transaction for card ${event.cardid}`);
    await pg_client.query('BEGIN');
    try {
        switch(event.event) {
        case "transaction":
            const insert_query = squel.insert()
                .into('transactions')
                .setFields({cardid: event.cardid,
                            transaction_timestamp: event.timestamp,
                            has_cvc: payload.has_cvc,
                            amount: payload.amount,
                            purpose: payload.purpose,
                           })
                .toString();
            await pg_client.query(insert_query);
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
    const consumer = kafka_utils.create_consumer(process.env.KAFKA_URL, 'transactions_connector', source_topic);

    const pg_client = new pg.Client()
    await pg_client.connect()
    kafka_utils.consume_messages(consumer, event => consume_event(pg_client,event));
    debug("Started listening on source_topic", source_topic);
}
consume();
