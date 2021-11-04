const { Router } = require('express');

const routes = Router();

require('./routes/bidding')(routes);

module.exports = routes;
