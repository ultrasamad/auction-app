const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { Bidding } = require('../../models');
const config = require('../../../config');
const { BiddingService } = require('../../services');
const { validateCreate } = require('../../middleware');

const router = Router();

const biddingService = new BiddingService(Bidding);

module.exports = (routes) => {
  routes.use('', router);

  const createBidSchema = {
    body: Joi.object().keys({
      productId: Joi.string().trim().required(),
      userId: Joi.string().trim().required(),
      bidAmount: Joi.number().required(),
    })
  }

  router.post(
    '/',
    celebrate(createBidSchema),
    async (req, res, next) => {
      try {
        const { productId, bidAmount } = req.body;
        const highestBid = await biddingService.highestBid(productId);
        if(highestBid && bidAmount <= highestBid.bidAmount) {
          return res.status(400).json({
            status: 'error',
            message: `Your Bid must be higher than the current highest Bid: GHS${highestBid.bidAmount}`
          })
        }
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Your bidding has been submitted successfully!',
            bidding: await biddingService.create(req.body),
          },
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.get(
    '/',
    async (req, res, next) => {
      const productId = req.query.productId;
      try {
        res.status(200).json({
          status: 'success',
          data: {
            biddings: await biddingService.list(productId),
          },
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.get(
    '/highest-bid',
    async (req, res, next) => {
      const productId = req.query.productId;
      try {
        res.status(200).json({
          data: {
            bid: await biddingService.highestBid(productId),
          }
        });
      } catch (err) {
        next(err);
      }
    }
  );
};
