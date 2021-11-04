module.exports = (req, res, next) => {
  //Dummy Implementation
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('Unauthorized!');
    err.status = 401;
    throw err;
  }
  const token = authHeader.split(' ')[1];
  if (token) {
    next();
  }else {
    next(error);
  }
};
