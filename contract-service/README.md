# Contract-service

## Getting Started
To launch Contract-service, use the command `Docker compose up` executed at the root of the project. This initiates the necessary services and sets up the environment for the application to run.

## Features
- **Contract Creation:** A contract consists of a contract number (primary key), a client number, a date, a list of numbers representing the IDs of sold parts, and a list of numbers representing the price at which the items were sold.
- **Contract Update:** All attributes defining a contract can be updated except its number.
- **Contract Deletion:** A contract can be deleted.
- **Contract Reading:** The route contracts/ returns all existing contracts, the route contracts/{ContractNumber} returns the details of the contract whose number is specified in the URL.

A Swagger UI presenting the various pre-filled requests is accessible via the URL http://localhost:4002/api/v1/contract.