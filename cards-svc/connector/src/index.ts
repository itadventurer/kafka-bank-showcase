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
            // TODO: Insert data from the event into the database
            //
            // Tipps:
            // * Checkout Squel: https://hiddentao.com/squel/#insert to easily construct the query
            // * Look into ../db/01-createdb.sql for fields that could match the fields in the event
            // * Do not forget to send the query using `pg_client.query(query)`
            console.error('Not implemented');
            break;
        case 'block_card':
            // TODO: What to do with a block_card event?
            console.error('Not implemented');
            break;
        case 'unblock_card':
            // TODO: What to do with a unblock_card event?
            console.error('Not implemented');
            break;
        case 'update_card_limit':
            // TODO:
            console.error('Not implemented');
            break;
        case 'cancel_cards':
            // TODO:
            console.error('Not implemented');
            break;
        case "transaction":
            // TODO:
            console.error('Not implemented');
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
    const pg_client = new pg.Client()
    await pg_client.connect()
    // TODO:
    // 1. Create a consumer
    // 2. Listen for messages and call consume_event for each received message
    // 3. Think about the consumer group!
}
consume();
