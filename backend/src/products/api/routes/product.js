const { Router } = require('express');

const { Product } = require('../../models');
const config = require('../../../config');
const { ProductService } = require('../../services');
const { celebrate, Joi } = require('celebrate');

const router = Router();

const productService = new ProductService(Product);

module.exports = (routes) => {
  routes.use('', router);

  const updateSchema = {
    body: Joi.object().keys({
      name: Joi.string().trim(),
      description: Joi.string().trim(),
      initialPrice: Joi.number(),
      biddingStatus: Joi.string().trim(),
    })
  }

  router.get(
    '/',
    async (req, res, next) => {
      try {
        res.status(200).json({
          status: 'success',
          data: {
            products: await productService.list(),
          },
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.get(
    '/:id',
    async (req, res, next) => {
      const {id: productId} = req.params;
      try {
        res.status(200).json({
          status: 'success',
          data: {
            product: await productService.fetch(productId),
          },
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.patch(
    '/:id',
    celebrate(updateSchema),
    async (req, res, next) => {
      const { id: productId } = req.params;
      const {
        name,
        description,
        initialPrice,
        biddingStatus, 
      } = req.body;
      try {
        return res.status(200).json({
          status: 'success',
          data: {
            product: await productService.update(productId, {name, description, initialPrice, biddingStatus}), 
          }
        })
      } catch (err) {
        next(err);
      }
    }
  );
};
