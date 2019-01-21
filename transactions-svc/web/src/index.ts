import express from 'express';
import tableify from 'tableify';
import { Client } from 'pg';

const app = express()
const pg_client = new Client()

app.get('/', async (req, res) => {
    const data = await pg_client.query("select transaction_timestamp::date as date, count(*) as num_transactions, avg(amount) as avg_amount, sum(amount) as sum_amount from transactions group by transaction_timestamp::date order by transaction_timestamp::date;");
    res.send(
        "<h1>Transactions</h1>" +
        tableify(data.rows));
});

async function init() {
    await pg_client.connect()
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
}
init()
