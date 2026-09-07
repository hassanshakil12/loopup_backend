const Boom = require("@hapi/boom");

// Validations
const userValidation = require("../validations/user");

// Constants
const message = require("../constants/MESSAGE");

// Utilities
const token = require("../utils/token");

const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(Boom.unauthorized(message.error.auth.required));
    }

    const [scheme, accessToken] = authorization.split(" ");

    if (scheme !== "Bearer" || !accessToken) {
      return next(Boom.unauthorized(message.error.auth.invalidHeader));
    }

    const payload = token.verifyAccessToken(accessToken);
    const user = await userValidation.throwErrorIfUserDoesNotExist(payload._id);

    if (user.isBlocked) {
      return next(Boom.unauthorized(message.error.auth.blockedUser));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = protect;
