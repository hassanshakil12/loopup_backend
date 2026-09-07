const Boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");

// Configs
const { env } = require("../configs");

exports.generateAccessToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      type: "access",
    },
    env.JWT.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.JWT.ACCESS_TOKEN_EXPIRATION,
    },
  );
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(
    {
      ...payload,
      type: "refresh",
    },
    env.JWT.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.JWT.REFRESH_TOKEN_EXPIRATION,
    },
  );
};

exports.verifyAccessToken = (token) => {
  const decoded = jwt.verify(token, env.JWT.ACCESS_TOKEN_SECRET);

  if (decoded.type !== "access") {
    throw Boom.badRequest("Invalid access token");
  }

  return decoded;
};

exports.verifyRefreshToken = (token) => {
  const decoded = jwt.verify(token, env.JWT.REFRESH_TOKEN_SECRET);

  if (decoded.type !== "refresh") {
    throw Boom.badRequest("Invalid refresh token");
  }

  return decoded;
};
