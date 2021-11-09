#!/usr/bin/env node

/**
 * Module dependencies.
 */

const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const app = require('../app');
const config = require('../config');

/**
 * Get port from environment and store in Express.
 */

const { host } = config.app;
const { port } = config.app;
const { front_end_url } = config.app;

app.set('port', port);

/**
 * Create HTTP server.
 */

const httServer = http.createServer(app);

/**
 * Socket.io initialization
 */

const io = new Server(httServer, {
   cors: {
     origins: [front_end_url]
   }
 });

const { createBidding } = require('../sockets/biddingsHandler')(io);
const { startTimer, stopTimer } = require('../sockets/timerHandler')(io);
const onConnection = (socket) => {
  //TODO: Connection per product
  console.log(`User has connected: ${socket.id}`);

  socket.on('timer:start', startTimer);
  socket.on('timer:stop', stopTimer);
  socket.on('bidding:create', createBidding);
};

io.on('connection', onConnection);

/**
 * ODM initialization.
 */

mongoose
  .connect(config.db.connectionString, config.db.connectionOptions)
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

/**
 * Listen on provided port, on all network interfaces.
 */
// eslint-disable-next-line no-console
console.log(`app running -> ${host}:${port}`);
httServer.listen(port);
