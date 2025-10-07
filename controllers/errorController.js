const AppError = require("../utils/AppError");
//DB errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => new AppError(err.message, 400);
// Auth Errors
const handleJWTTokenError = (err) =>
  new AppError(`${err.message}.please login again`, 401);
// dev and prod errors
const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("error🚫", err);
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  const env = process.env.NODE_ENV || "development";
  if (env === "production") {
    let error = { ...err, name: err.name, message: err.message };
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTTokenError(error);
    }
    if (error.code === 11000) {
      error = handleDupilcateDocument(error);
    }
    sendErrProduction(error, res);
  } else if (env === "development") {
    sendErrDev(err, res);
  }
};
