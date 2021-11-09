const { celebrate, Joi, CelebrateError } = require('celebrate');
const { Bidding } = require('../models');
const { BiddingService } = require('../services');

const biddingService = new BiddingService(Bidding);

module.exports = async (req, res, next) => {
    //
};