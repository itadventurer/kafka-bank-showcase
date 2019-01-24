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

### Setup your "IDE"

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
3. Wait
4. After some time you should see the following message:
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
   (go to terminal with id `[NUM-OF-TERMINAL]`)
