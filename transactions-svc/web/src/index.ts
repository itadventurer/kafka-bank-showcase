import express from 'express';
import tableify from 'tableify';
import { Client } from 'pg';

const app = express()
const pg_client = new Client()

app.get('/', async (req, res) => {
    // TODO: Think about a SQL query to group the transaction by date and show the total amount for that day.
    //
    // Tipp: take a look into ../../connector/db/01-createdb.sql for fields you could query

    res.send('Not implemented');
    //const data = await pg_client.query("…");
    //res.send(
    //    "<h1>Transactions</h1>" +
    //    tableify(data.rows));
});

async function init() {
    await pg_client.connect()
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
}
init()
