module.exports = {
  connectionString: `mongodb${process.env.CONNECTION_MODE === 'dns' ? '+srv' : ''}://${
    process.env.DB_USER
  }:${process.env.DB_PASSWORD}@${process.env.MONGO_SERVICE}/${process.env.DB_DATABASE}?authSource=admin&w=1`,
  connectionOptions: {
    useNewUrlParser: true,
  },
};

