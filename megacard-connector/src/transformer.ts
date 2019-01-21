import express from 'express';
import kafka_utils from './kafka_utils';
const debug = require('debug')('showcase:debug:megacard-transformer');

const source_topic = process.env.MEGACARD_RAW_LOG;
const cards_topic = process.env.CARDS_LOG;
const transactions_topic=process.env.TRANSACTIONS_LOG;

async function consume_event(producer,event) {
    if(!event) {
        console.error('Errornous message: ', event);
        return;
    }
    try {
        switch(event.event) {
        case 'transaction':
            debug(`Transaction with card ${event.cardid}. Charged ${event.payload.amount}`);
            await kafka_utils.produce_msgs(producer, transactions_topic, event, event.cardid);
            break;
        case 'add_card':
        case 'block_card':
        case 'unblock_card':
        case 'update_card_limit':
        case 'cancel_cards':
            debug(`card event (${event.event}) of card ${event.cardid}`);
            await kafka_utils.produce_msgs(producer, cards_topic, event, event.cardid);
            break;
        default:
            console.error('Unknown event:', event);
        }
    } catch (e) {
        console.error('Error: ', e);
    }
}

function consume() {
    kafka_utils.create_producer(process.env.KAFKA_URL, 'cyclic').then(producer => {
        const consumer = kafka_utils.create_consumer(process.env.KAFKA_URL,
                                                     'megacard_transformer',
                                                     source_topic);
        kafka_utils.consume_messages(consumer, e => consume_event(producer,e));
        debug("Started listening on source_topic", source_topic);
    });

}


consume();
