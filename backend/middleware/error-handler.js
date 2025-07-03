const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  // Handle Mongoose duplicate key errors
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === "CastError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.message = "Invalid ID format";
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = "Invalid token";
  }

  // Handle JWT expiration errors
  if (err.name === "TokenExpiredError") {
    defaultError.statusCode = StatusCodes.UNAUTHORIZED;
    defaultError.message = "Token expired";
  }

  // Log error for debugging (in development)
  if (process.env.NODE_ENV === "development") {
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(defaultError.statusCode).json({
    success: false,
    message: defaultError.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandlerMiddleware;
