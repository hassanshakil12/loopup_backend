const Boom = require("@hapi/boom");

// Services
const profileServices = require("../services/profileService");

// Repositories
const userRepository = require("../repositories/userRepository");

// Validations
const joi = require("../validations/joi");
const joiSchema = require("../validations/joi/schemas/auth");
const userValidation = require("../validations/user");
const profileValidation = require("../validations/profile");

// Constants
const message = require("../constants/MESSAGE");

// Configs
const { env } = require("../configs");

// Utilities
const encryption = require("../utils/encryption");
const token = require("../utils/token");

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

exports.logout = async (payload) => {};

exports.changePassword = async (payload) => {};
