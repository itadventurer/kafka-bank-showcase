CREATE TABLE IF NOT EXISTS cards (
       cardid varchar PRIMARY KEY,
       cardholder varchar NOT NULL,
       card_limit float NOT NULL,
       is_blocked boolean NOT NULL,
       is_cancelled boolean NOT NULL DEFAULT FALSE
       );

CREATE TABLE IF NOT EXISTS transactions (
       id SERIAL PRIMARY KEY,
       cardid varchar NOT NULL,
       transaction_timestamp timestamp NOT NULL,
       amount float NOT NULL
       );

INSERT INTO cards (cardid, cardholder, card_limit, is_blocked)
       VALUES
       ('2235049176190327','Dave Simpsons', 1000, FALSE)
       , ('0126183523704441','Eve Doe', 1500, FALSE)
       , ('8851809327029570','Alice Burns', 100, TRUE)
       , ('7865014459370853','Charlie Simpsons', 1000, FALSE)
       , ('9674459412064927','Bob Simpsons', 1000, FALSE)
       , ('1998759422653175','Alice Simpsons', 1000, FALSE)
       , ('1112034633866638','Dave Burns', 1000, FALSE)
       , ('5501155917652982','John Doe', 1000, FALSE)
       , ('4201993032353943','Eve Doe', 1000, FALSE)
       , ('8934731871681082','John John', 1000, FALSE)
       , ('4038836996963190','Alice Bob', 1000, FALSE)
       , ('5916699084722089','Foo Bar', 1000, FALSE)
       ON CONFLICT DO NOTHING;
