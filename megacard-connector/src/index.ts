// Produce Messages
import {gen_transactions} from './transaction_gen';
import {gen_card_events} from './card_gen';
import kafka_utils from './kafka_utils';
// Web Server
import express from 'express';

const megacard_raw_log = process.env.MEGACARD_RAW_LOG;
const kafka_url = process.env.KAFKA_URL;

function start_web_app(producer) {
    const app = express();

    // Simple Endpoint

    app.get('/', (req, res) => {
        res.send(['/produce_transaction', '/produce_card']);
    })

    app.get('/produce_transaction', (req, res) => {
        // TODO:
        // 1. Generate some example transactions
        // 2. Extract the key
        // 3. Produce messages to the megacard_raw_log
        // 4. Return the events on success
        // 5. Show an error if not
        //
        // Tipps:
        // * Look what `gen_transactions` is doing
        // * Is there a logical key in the events?
        // * Look in ./kafka_utils.ts for a function to produce messages.
        // * Use Promise notation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):
        //   * call_fn().then(…callback-function).catch(on error)
        // * Use anonymous functions: (parameter1, p2) => {console.log('foo')}

        res.send('Not implemented');
    });

    app.get('/produce_card', (req, res) => {
        // TODO:
        // 1. Generate some example card events
        // 2. Extract the key
        // 3. Produce messages to the megacard_raw_log
        // 4. Return the events on success
        // 5. Show an error if not
        res.send('Not implemented');
    });

    app.listen(8080, () => console.log('Example app listening on port 8080!'))

}

// TODO: Create a producer and call `start_web_app` with the producer
//
// Tipps:
//
// Look in ./kafka_utils.ts for a function to create a producer.
// Think about a partitioning scheme
// Use Promise notation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise):
// call_fn().then(…callback-function).catch(on error)


start_web_app(null);
