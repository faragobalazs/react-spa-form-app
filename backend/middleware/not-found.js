const { StatusCodes } = require("http-status-codes");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = StatusCodes.NOT_FOUND;
  next(error);
};

module.exports = notFound;
