import gen_utils from './gen_utils';
import moment from 'moment';

const first_names = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
const last_names = ['Doe', 'Simpsons', 'Burns'];

function add_card(cards) {
    const card = {
        cardid: gen_utils.gen_cc_num(),
        cardholder_name: `${gen_utils.take_random(first_names)} ${gen_utils.take_random(last_names)}`,
        limit: gen_utils.random_int_between(1000,5000),
        blocked: false,
        last_event: gen_utils.random_date_between(moment("20180102", "YYYYMMDD")),
    };
    cards.push(card);
    return {event: "add_card",
            timestamp: card.last_event,
            payload: card,
            cardid: card.cardid,
            msg_id: gen_utils.session_id_gen()};
}

function update_card(cards) {
    var card = gen_utils.take_random(cards);
    card.last_event = gen_utils.random_date_between(card.last_event);
    if(gen_utils.random_boolean()) {
        card.blocked = !card.blocked;
        if(card.blocked) {
            return {event: "block_card",
                    cardid: card.cardid,
                    timestamp: card.last_event,
                    msg_id: gen_utils.session_id_gen()};
        } else {
            return {event: "unblock_card",
                    cardid: card.cardid,
                    timestamp: card.last_event,
                    msg_id: gen_utils.session_id_gen()};
        }
    } else {
        card.limit = gen_utils.random_int_between(1000,5000);
        return {event: "update_card_limit",
                cardid: card.cardid,
                payload: card.limit,
                timestamp: card.last_event,
                msg_id: gen_utils.session_id_gen()};
    }
}

function cancel_card(cards) {
    var card = cards.pop();
    card.last_event = gen_utils.random_date_between(card.last_event);
    return {event: "cancel_card",
            cardid: card.cardid,
            timestamp: card.last_event,
            msg_id: gen_utils.session_id_gen()};
}



export function gen_card_events() {
    const cards = new Array();
    const add_n = gen_utils.random_int_between(1,5);
    const update_n = gen_utils.random_int_between(0,5);
    const cancel_n = gen_utils.random_int_between(0, add_n);
    const events = new Array();
    for (var i = 0; i<add_n; i++) {
        events.push(add_card(cards));
    }
    for (var i = 0; i<update_n; i++) {
        events.push(update_card(cards));
    }
    for (var i = 0; i<cancel_n; i++) {
        events.push(cancel_card(cards));
    }
    return events;
}
