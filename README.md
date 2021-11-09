# Auction App

A Scopic Software Take Home project developed using [NodeJS](https://nodejs.dev/), [MongoDB](https://www.mongodb.com/), [VueJS](https://v3.vuejs.org/), and [Tailwind CSS](https://tailwindcss.com/).

# Requirements
 * [Docker](https://www.docker.com/)
 * [Docker Compose](https://docs.docker.com/compose/)

# How to run the project
 * Clone the repository `$ git clone git@github.com:ultrasamad/auction-app.git`
 * Go to the project root directory
 `$ cd auction-app`
 * Build and start the docker containers
 `$ make start` or `$ docker-compose up`
  Note: This may take a couple of minutes depending on your internet connection.

 * Populate database with sample products
 `$ make seed` or `$ docker-compose exec api npm run seed`

 * Access the application
  - Website: `http://localhost:8000`
  - Dashboard: `http://localhost:8000/dashboard`

 * Stop containers
 `$ make stop` or `$ docker-compose stop`

 # Additional information
 - When you pull the new updates, please re-run the seeders: `$ make seed` or `$ docker-compose exec api npm run seed `
 - On the unlikely condition the application fails to start, please rebuild the docker containers: `$ docker-compose build --no-cache`
