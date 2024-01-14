# microservice-backend

# Global Architecture

## Overview

This repository contains a NestJS microservice designed for all the micro-services management. It includes several functionalities for managing all the endpoints of all the micro-services.

## Microservice Architecture
In our architecture, we build a modular approach to build applications where each component (microservice) focuses on a specific function or feature. NestJS simplifies the development and management of these microservices, promoting flexibility and efficient scaling.
## API Gateway
We use HTTP for the API gateway because it's a versatile and widely adopted protocol that allows for efficient communication between clients and microservices, making it an ideal choice for managing and routing requests.
Previously, a poor attempt to use the protocol gRPC as the main centralized API Gateway was developed in the sprint iteration but judging by the simplicity of the HTTP request, it sorted out all the services management.

# Setup
All the microservices are independently containerized into small dependencies. For each service, you'll have to run the docker compose file starting by the microservices before the gateway:
```bash
docker network create shared_network
docker compose up --build
```
# Database Management

All the microservices are connected to a PostgreSQL database for storing all the operational data in each controller. 

To interact with the database for a given service, you might directly do it by docker:
```
docker exec -it <container-id> psql -U <username> -d <database-name>
```
Or by simply accessing to the containerized pgAdmin interface. Access to ``localhost:<port-number>`` and the last step is to authentificate:

![pgadmin](https://i.imgur.com/mJizknS.png)

Make sure to replace all the placeholders by the right secrets.
# OpenAPI v1 Documentation
The Swagger documentation for each microservice is implemented for API usability purposes. Access to ``localhost:<port-number>/api/v1/<service-name>`` to view the dedicated Swagger of the specified service.

Here's an example of the OpenAPI documentation:

![documentation](https://i.imgur.com/bvM4Ybk.png)

# MQTT Broker Service
A basic simulation of a MQTT environment to pull or push messages in a light MQTT broker system named *Mosquitto*. Each machine of the production stream events about the supply chain, the part information references or the materials data.

In our gateway, this service will act as an event emitter that publish messages and insert it in the Production service API.

# Kafka Producer (PubSub System)
A Kafka broker enabled by a docker compose that setup the Zookeeper and the Kafka Broker with multiple partitions created by default in all topics.
Our backend service will act as a Kafka producer where our [Python Client](https://github.com/4PROJ-5PROJ-Namkin/data-migration) will subscribe to the topics recognized.

# Load Balancing And API Infrastructure
Load balancing is performed by haproxy in each service.
HAProxy serves as an efficient reverse proxy and load balancer, optimizing traffic distribution and ensuring high availability for our services.




---
