# Kafka Workshop Hands on

## Setup your Play with Docker instance

1. Create a [Docker Hub Account](https://hub.docker.com/)
2. Login to [Play with Docker](https://labs.play-with-docker.com/)
3. Create a new instance
4. Open tmux and get the showcase
   ```sh
   tmux
   git clone https://github.com/azapps/kafka-bank-showcase.git
   ```

## Let's play with Kafka

### Boot Kafka

1. Open a new terminal window: `Ctrl+B C` (first press `CTRL` and `B`,
   release your fingers and press `C`) (We are using tmux here)
2. Boot Kafka:
   ```sh
   # Start the broker service and all dependencies
   cd kafka-bank-showcase
   docker-compose up broker
   ```
3. Wait until you see the following message:
   ```
    [2019-01-24 14:22:46,326] INFO Successfully submitted metrics to Confluent via secure endpoint (io.confluent.support.metrics.submitters.ConfluentSubmitter)
   ```
5. This is ok and now the broker is ready

### Produce a few messages

1. Open a new terminal window: `Ctrl+B C`
2. Produce some messages to
   [Kafkacat](https://github.com/edenhill/kafkacat)
   ```sh
   docker run -it \
       --net=kafka-bank-showcase_default \
       solsson/kafkacat \
       -P -b broker:9092 -t testtopic -p 0
   ```
3. Type some lines and press `Ctr+D` to close the session (End of file)

### Consume the messages

1. Again, use Kafkacat to do so. Now with the flag `-C` (consumer)
   instead of `-P` (Producer):
   ```sh
   docker run -it \
       --net=kafka-bank-showcase_default \
       solsson/kafkacat \
       -C -b broker:9092 -t testtopic
   ```
2. When you have seen enough, just press `Ctrl+C` to close the session
   (Abort command)
3. You can also open a few terminals (remember: `Ctrl+B C`) and start
   some producers and consumers. Switch between the terminals using
   `Ctrl+B l` (go to the last window) or `Ctrl+B [NUM-OF-TERMINAL]`
   (go to terminal with id `[NUM-OF-TERMINAL]`). See
   [kafkacat](https://github.com/edenhill/kafkacat) for more flags and
   configuration options.

## Try out the Showcase

1. Close all terminal windows (Stop producers with `Ctrl + D`, all
   other commands with `Ctrl + C` and close terminal windows with
   `Ctrl + D`)
2. The green bar on the bottom disappears after all windows are closed
3. Open tmux again:
   ```sh
   tmux
   ```
4. Start all Showcase services:
   ```sh
   cd ~/kafka-bank-showcase
   docker-compose up
   ```
5. Wait until Kafka started and wait more until the services are
   launched (they have a `sleep 45` before bootup to wait for Kafka)
6. Above the Terminal window you should see port numbers appearing:
   * `2181`: Zookeeper (we can ignore that)
   * `8080`: The entry service (we can ignore that in this environment)
   * `8082`: Megacard producer (produces messages)
   * `8083`: Cards service (shows data about the cards in the system)
   * `8084`: Transactions service (shows total transaction amount per day)
   * `9092`: Main Kafka port
   * `9555`: … More
   * `9999`: … Kafka
   * `29092`: … Ports
7. Open the `808*` ports and play around and see what happens.

### Observe the content of the logs

1. Open a new terminal window: `Ctrl+B C`
2. Run kafkacat
   ```sh
   docker run -it \
       --net=kafka-bank-showcase_default \
       solsson/kafkacat \
       -C -b broker:9092 -t megacard_raw_log
   ```
3. Interesting topics are:
   * `megacard_raw_log`: All megacard events
   * `cards_log`: All events regarding cards
   * `transactions_log`: All transactions
4. Continue playing around with the services above and see what is
   written to the log

## Let's code

1. Close your consumer terminal windows (use `Ctrl + C` and `Ctrl +
   B`). Leave the docker-compose open
2. Open a new terminal window (`Ctrl + B C`)
3. Remove the business logic ;)
   ```sh
   git fetch origin without_business_logic
   git checkout without_business_logic
   ```

### Setup your "IDE"

1. Open a new terminal window (`Ctrl + B C`)
2. Start [Codiad](http://codiad.com/):
   ```sh
   chmod -R 777 kafka-bank-showcase
   # Run an Codiad
   docker run \
          --name=codiad --rm \
          -v /etc/localtime:/etc/localtime:ro \
          -v `pwd`/codiad_data:/bitnami \
          -v `pwd`/kafka-bank-showcase:/kafka-bank-showcase \
          -e CODIAD_USERNAME=user \
          -e CODIAD_PASSWORD=password \
          -e CODIAD_PROJECT_NAME="Kafka Bank Showcase" \
          -e CODIAD_PROJECT_PATH=/kafka-bank-showcase \
          -p 80:80 \
          bitnami/codiad
   ```
3. This will take some time.
4. Open the port 80 in a new tab.
5. Username: **user**, Password: **password**

### Start coding

Open the following files in the IDE and start coding:

* `./megacard-connector/src/index.ts`
* `./megacard-connector/src/transformer.ts`
* `./transactions-svc/connector/src/index.ts`
* `./transactions-svc/web/src/index.ts`
* `./cards-svc/connector/src/index.ts`
* `./cards-svc/web/src/index.ts`

**Tipps**:

* The services are configured s.t. they reload the code whenever the
  file changes. Just save the file and reload the page.
* Show the diff between your edits and my reference code:
  ```sh
  git diff master [FILENAME]
  ```
* Revert your code changes of a file:
  ```sh
  git checkout -- [FILENAME]
  ```
* Replace your code changes with my reference code:
  ```sh
  git checkout master [FILENAME]
  ```
**Happy Hacking!**
