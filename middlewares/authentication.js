const Boom = require("@hapi/boom");

// Validations
const userValidation = require("../modules/user/user.validation");

// Constants
const { MESSAGE: message } = require("../common/constants");

// Utilities
const token = require("../common/utils/token");

const protect = async (req, res, next) => {
  try {
    const authorization = req.cookies.accessToken;

    if (!authorization) {
      return next(Boom.unauthorized(message.error.auth.forbidden));
    }

    const [scheme, accessToken] = authorization.split(" ");

    if (scheme !== "Bearer" || !accessToken) {
      return next(Boom.unauthorized(message.error.auth.forbidden));
    }

    const payload = token.verifyAccessToken(accessToken);
    const user = await userValidation.throwErrorIfUserDoesNotExist(payload._id);

    if (user.isBlocked) {
      return next(Boom.unauthorized(message.error.auth.forbidden));
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error(error);

    throw Boom.unauthorized(message.error.auth.forbidden);
  }
};

module.exports = protect;
