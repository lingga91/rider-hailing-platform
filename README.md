# Ride Hailing Platform

A microservice to track live location of drivers. 

# API Endpoints

Consists of three different endpoints

1. POST：/location 
  - submit driver location update
  - accept `driver_id`, `latitude`, `longitude`, `timestamp` payload

2. GET: /location/:driver_id
  - Get the latest location of a specific driver

3. GET: /location/history/:driver_id
  - Get location history of a specific driver
  

## System Requirements

- Docker ^4.x
- Docker Compose ^2.x
- Default ports [3000 (app) and 27017 (DB)] must be available.
- Node JS installed locally to run the simulator script.

## Setup
- Run `docker-compose up --build`.
- If there are no issues, the app should run `http://localhost:3000`.
- The database should run on port `27017`. 
- After the container is running, execute `node simulate.js` in your terminal
  to run driver location simulator.

## Tech Stack
- Node JS
- Typescript
- Nest JS
- Mongo DB


