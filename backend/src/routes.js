module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({
      error: false,
      message: 'Auction API up and running!',
    });
  });

  app.use('/api/products', require('./products/api'));
  app.use('/api/biddings', require('./biddings/api'));
};
