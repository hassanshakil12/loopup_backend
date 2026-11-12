const Boom = require("@hapi/boom");

// Services
const profileServices = require("../profile/profile.service");

// Repositories
const userRepository = require("../user/user.repository");

// Validations
const joi = require("../../configs/joi");
const joiSchema = require("./auth.schema");
const userValidation = require("../user/user.validation");
const profileValidation = require("../profile/profile.validation");

// Constants
const { MESSAGE: message } = require("../../common/constants");

// Configs
const env = require("../../configs/env");

// Utilities
const encryption = require("../../common/utils/encryption");
const token = require("../../common/utils/token");

exports.login = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.login);

  let user;
  if (validatedPayload.email) {
    user = await userValidation.throwErrorIfEmailDoesNotExist(
      validatedPayload.email,
    );
  } else {
    user = await userValidation.throwErrorIfUsernameDoesNotExist(
      validatedPayload.username,
    );
  }

  const password = await encryption.decrypt(user.password, env.ENCRYPTION.KEY);

  if (password !== validatedPayload.password) {
    throw Boom.conflict(message.error.auth.invalidCredentials);
  }

  const accessToken = token.generateAccessToken({ _id: user._id });
  const refreshToken = token.generateRefreshToken({ _id: user._id });

  const profile =
    await profileValidation.throwErrorIfProfileDoesNotExistByUserId(user._id);

  return {
    ...user,
    ...profile,
    accessToken,
    refreshToken,
  };
};

exports.register = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.register);

  await userValidation.throwErrorIfEmailAlreadyExists(validatedPayload.email);
  await userValidation.throwErrorIfUsernameAlreadyExists(
    validatedPayload.username,
  );

  validatedPayload.password = await encryption.encrypt(
    validatedPayload.password,
    env.ENCRYPTION.KEY,
  );

  const user = userRepository.create(validatedPayload);

  const profilePayload = {
    user: user._id,
    title: validatedPayload.title,
    dateOfBirth: validatedPayload.dateOfBirth,
    gender: validatedPayload.gender,
  };
  await profileServices.createProfile(profilePayload);

  return user;
};

exports.refresh = async (refreshToken) => {
  if (!refreshToken) throw Boom.badRequest("Refresh token is required");

  const decoded = token.verifyRefreshToken(refreshToken);
  await userValidation.throwErrorIfEmailDoesNotExist(decoded._id);

  const accessToken = token.generateAccessToken({ _id: decoded._id });
  return accessToken;
};

exports.logout = async (id) => {};

exports.changePassword = async (payload) => {};
