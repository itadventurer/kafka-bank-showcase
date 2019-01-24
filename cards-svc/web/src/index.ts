import express from 'express';
import tableify from 'tableify';
import { Client } from 'pg';

const app = express()
const pg_client = new Client()

app.get('/', async (req, res) => {
    // TODO:
    // Two queries here:
    // 1. Show all known cards and the total amount of transactions for each
    // 2. Show all unknown cards and the total amount of transactions for each
    //
    // Tipp: take a look into ../../connector/db/01-createdb.sql for fields you could query
    res.send('Not implemented')
    //const known_cards = await pg_client.query("");
    //const unknown_cards = await pg_client.query("");
    //res.send(
    //    "<h1>Known cards with Transactions</h1>" +
    //        tableify(known_cards.rows) +
    //        "<h1>Transactions with unknown cards</h1>" +
    //        tableify(unknown_cards.rows)
    //);
});

async function init() {
    await pg_client.connect()
    app.listen(8080, () => console.log('Example app listening on port 8080!'))
}
init()
