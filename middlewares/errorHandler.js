const { isBoom } = require("@hapi/boom");

// Constants
const { MESSAGE: message } = require("../common/constants");

const errorHandler = (err, req, res, next) => {
  const error = getErrorResponse(err);

  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
  });
};

const getErrorResponse = (err) => {
  if (isBoom(err)) {
    return {
      statusCode: err.output.statusCode,
      message: err.message,
    };
  }

  if (err.isJoi) {
    return {
      statusCode: 400,
      message: err.details[0]?.message || "Validation error",
    };
  }

  if (err.name === "ValidationError") {
    const firstError = Object.values(err.errors)[0];

    return {
      statusCode: 400,
      message: firstError?.message || "Validation error",
    };
  }

  if (err.name === "CastError") {
    return {
      statusCode: 400,
      message: `Invalid ${err.path}`,
    };
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];

    return {
      statusCode: 409,
      message: field
        ? `${field} already exists`
        : "A record with the provided information already exists",
    };
  }

  if (err.name === "JsonWebTokenError") {
    return {
      statusCode: 401,
      message: "Invalid authentication token",
    };
  }

  if (err.name === "TokenExpiredError") {
    return {
      statusCode: 401,
      message: "Authentication token has expired",
    };
  }

  return {
    statusCode: err.statusCode || 500,
    message: err.statusCode ? err.message : "Internal Server Error",
  };
};

module.exports = errorHandler;
