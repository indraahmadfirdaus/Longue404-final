const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    err.status = 400;
  }

  return res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
};

module.exports = errorHandler;
