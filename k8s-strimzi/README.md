# Setup Kafka Cluster with Showcase on Kubernetes using Strimzi

[Strimzi](https://strimzi.io/)

## Preparations

For this step you need `cluster-admin` rights.

On GKE you can get them using:

```sh
kubectl create clusterrolebinding cluster-admin-binding \
--clusterrole cluster-admin --user [YOUR-USER]
```

Create CRDs, ClusterRoles, etc…

```sh
kubectl apply -f 00-kafka-cluster-setup/00-with-cluster-admin
```

## Setup Kafka Cluster

* Setups Kafka Cluster using Strimzi
* Creates namespace `kafka-cluster` and deploys following artefacts:
  * [Strimzi Cluster Operator](https://strimzi.io/docs/latest/#cluster-operator-str)
  * 3 Zookeeper nodes
  * 3 Kafka nodes
  * [Strimzi Entity Operator](https://strimzi.io/docs/latest/#assembly-kafka-entity-operator-deployment-configuration-kafka)

```sh
kubectl apply -f 00-kafka-cluster-setup/01-kafka-cluster/
```

## Setup Tooling

Deploys following artefacts in the `kafka-cluster` namespace:

* k8s-copy-secrets
* [kafka-healthcheck](https://github.com/azapps/kafka-healthcheck)
  * Creates Service `healthcheck` with open port 8080
  * Creates Topic `healthcheck` and User `healthcheck` in Kafka

```sh
kubectl apply -f 00-kafka-cluster-setup/02-kafka-tooling/
```

## Setup Kafka Showcase

Creates namespace `kafka-showcase` and deploys following artefacts:

* Create the `kafka-showcase` namespace:
  ```sh
  kubectl apply -f ./01-showcase-namespace.yaml
  ```
* Create the topics required for the showcase:
    * `kafka-showcase.megacard-raw-log`
    * `kafka-showcase.cards-log`
    * `kafka-showcase.transactions-log`
  They are created in the namespace `kafka-cluster` as Strimzi watches
  only that namespace
  ```sh
  kubectl apply -f ./02-showcase-topics.yaml
  ```
* Create the user (`kafka-showcase`). It is created in the
  `kafka-cluster` namespace and the secrets are copied by
  `k8s-copy-secrets` to our `kafka-showcase` namespace:
  ```sh
  kubectl apply -f ./03-showcase-user.yaml
  ```
* Deploy the Showcase using the secrets from the previous step to the
  namespace `kafka-showcase`:
  ```sh
  kubectl apply -f ./04-showcase-deploy.yaml
  ```
