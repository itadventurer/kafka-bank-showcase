CREATE TABLE IF NOT EXISTS transactions (
       id SERIAL PRIMARY KEY,
       cardid varchar NOT NULL,
       transaction_timestamp timestamp NOT NULL,
       has_cvc boolean NOT NULL,
       amount float NOT NULL,
       purpose VARCHAR NOT NULL
       );
