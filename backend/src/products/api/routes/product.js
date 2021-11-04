const { Router } = require('express');

const { Product } = require('../../models');
const config = require('../../../config');
const { ProductService } = require('../../services');

const router = Router();

const productService = new ProductService(Product);

module.exports = (routes) => {
  routes.use('', router);

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
      const productId = req.params.id;
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
};
