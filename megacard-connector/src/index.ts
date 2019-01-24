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
        const events = gen_transactions();
        const key = events[0].cardid;
        kafka_utils.produce_msgs(producer, megacard_raw_log, events, key)
            .then(() => res.send(events))
            .catch(err => res.send(err));
    });

    app.get('/produce_card', (req, res) => {
        const events = gen_card_events();
        const key = events[0].cardid;
        kafka_utils.produce_msgs(producer, megacard_raw_log, events, key)
            .then(() => res.send(events))
            .catch(err => res.send(err));
    });

    app.listen(8080, () => console.log('Example app listening on port 8080!'))

}

kafka_utils.create_producer(kafka_url, 'random').then(start_web_app);
