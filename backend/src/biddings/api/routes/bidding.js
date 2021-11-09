const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { Bidding } = require('../../models');
const { Product } = require('../../../products/models');
const config = require('../../../config');
const { BiddingService } = require('../../services');
const { ProductService } = require('../../../products/services')

const router = Router();

const biddingService = new BiddingService(Bidding);
const productService = new ProductService(Product);

module.exports = (routes) => {
  routes.use('', router);

  const createBidSchema = {
    body: Joi.object().keys({
      productId: Joi.string().trim().required(),
      userId: Joi.string().trim().required(),
      bidAmount: Joi.number().required(),
      autoBid: Joi.boolean().required(),
    })
  }

  router.post(
    '/',
    celebrate(createBidSchema),
    async (req, res, next) => {
      try {
        const { productId, bidAmount, autoBid } = req.body;
        const highestBid = await biddingService.highestBid(productId);
        if(highestBid && bidAmount <= highestBid.bidAmount) {
          return res.status(400).json({
            status: 'error',
            message: `Your Bid must be higher than the current highest Bid: GHS${highestBid.bidAmount}`
          })
        }
        //update product autoBid
        const bidding = await biddingService.create(req.body);
        if(autoBid === true) {
          const product = await Product.findOneAndUpdate(
            {_id: productId}, 
            { autoBid }
          )
        }
        res.status(201).json({
          status: 'success',
          data: {
            message: 'Your bidding has been submitted successfully!',
            bidding: bidding,
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
