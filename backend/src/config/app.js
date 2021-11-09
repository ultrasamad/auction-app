module.exports = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  front_end_url: process.env.FRONT_END_URL || 'http://localhost:8000' 
};
