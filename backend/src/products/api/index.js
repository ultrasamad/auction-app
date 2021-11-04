const { Router } = require('express');

const routes = Router();

require('./routes/product')(routes);

module.exports = routes;
