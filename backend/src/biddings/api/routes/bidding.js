const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const { Bidding } = require('../../models');
const config = require('../../../config');
const { BiddingService } = require('../../services');

const router = Router();

const biddingService = new BiddingService(Bidding);

module.exports = (routes) => {
  routes.use('', router);

  router.post(
    '/',
    celebrate({
      body: Joi.object().keys({
        productId: Joi.string().trim().required(),
        userId: Joi.string().trim().required(),
        bidAmount: Joi.number().required(),
      })
    }),
    async (req, res, next) => {
      try {
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
};
