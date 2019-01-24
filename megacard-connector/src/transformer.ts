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
            // TODO: Produce the event we just got to the transactions topic
            //
            // Tipps:
            // Relevant variables are:
            // * producer: the producer object to pass to the kafka_utils function
            // * transactions_topic: the name of the transactions topic to produce to
            // * event: the original event we want to produce to the topic
            // * event.cardid
            console.error('Not implemented');
            break;
        case 'add_card':
        case 'block_card':
        case 'unblock_card':
        case 'update_card_limit':
        case 'cancel_cards':
            debug(`card event (${event.event}) of card ${event.cardid}`);
            // TODO: Produce the event we just got to the cards topic
            console.error('Not implemented');
            break;
        default:
            console.error('Unknown event:', event);
        }
    } catch (e) {
        console.error('Error: ', e);
    }
}

function consume() {
    // TODO:
    // 1. Create a producer as `consume_event` is called with a producer and an event
    // 2. Create a Kafka consumer
    // 3. Create a listener that polls Kafka using the consumer and calls the consume_event function
    //
    // Tipps:
    // * Create the producer the same way as in index.ts
    // * Look in kafka_utils.ts for a function to create a consumer
    // * Look in kafka_utils.ts for a function to consume messages
    console.error('Not implemented');
}


consume();
