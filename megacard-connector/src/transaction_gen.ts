import gen_utils from './gen_utils';
import moment from 'moment';

const example_customers = [
    '2235049176190327',
    '0126183523704441',
    '8851809327029570',
    '7865014459370853',
    '9674459412064927',
    '1998759422653175',
    '1112034633866638',
    '5501155917652982',
    '4201993032353943',
    '8934731871681082',
    '4038836996963190',
    '5916699084722089',
    '0785320803051319',
    '7327938774416014',
    '7790486303956652',
    '6251396018827037']

const purposes = [
    'Stuff',
    'Shoes',
    'Taxi',
    'Fuel',
    'Donuts'
];

export function gen_transactions(start_time=Date.now(), customers = example_customers) {
    const cardid = gen_utils.take_random(customers);
    const events = new Array();
    for(var i = 0; i < gen_utils.random_int_between(1,5); i++) {
        events.push({
            event: "transaction",
            cardid: cardid,
            payload: {
                has_cvc: gen_utils.random_boolean(),
                amount: gen_utils.random_between(100,1000),
                purpose: gen_utils.take_random(purposes)
            },
            timestamp: gen_utils.random_date_between(moment().add(-5, 'days')),
            msg_id: gen_utils.session_id_gen()
        });
    }
    return events;
}
