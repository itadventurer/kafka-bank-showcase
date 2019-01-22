import express from 'express';
import tableify from 'tableify';
import { Client } from 'pg';

const app = express()
const pg_client = new Client()

app.get('/', async (req, res) => {
    const known_cards = await pg_client.query("select cards.*, sum(transactions.amount) as transactions_amount from cards left join transactions on cards.cardid = transactions.cardid group by cards.cardid;");
    const unknown_cards = await pg_client.query("select transactions.cardid, sum(amount) as transactions_amount from transactions left join cards on cards.cardid = transactions.cardid where cards.cardid is null group by transactions.cardid;");
    res.send(
        "<h1>Known cards with Transactions</h1>" +
            tableify(known_cards.rows) +
            "<h1>Transactions with unknown cards</h1>" +
            tableify(unknown_cards.rows)
    );
});

async function init() {
    await pg_client.connect()
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
}
init()
