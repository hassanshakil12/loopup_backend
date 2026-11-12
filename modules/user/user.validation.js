const Boom = require("@hapi/boom");

// Repositories
const userRepository = require("./user.repository");

// Constants
const { MESSAGE: message } = require("../../common/constants");

exports.throwErrorIfUserDoesNotExist = async (userId) => {
  const user = await userRepository.getUserById(userId);
  if (!user) throw Boom.notFound(message.error.user.notFound);

  return user;
};

exports.throwErrorIfEmailDoesNotExist = async (email) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw Boom.conflict(message.error.user.emailNotFound);

  return user;
};

exports.throwErrorIfUsernameDoesNotExist = async (username) => {
  const user = await userRepository.getUserByUsername(username);
  if (!user) throw Boom.conflict(message.error.user.usernameNotFound);

  return user;
};

exports.throwErrorIfEmailAlreadyExists = async (email) => {
  const user = await userRepository.getUserByEmail(email);
  if (user) throw Boom.conflict(message.error.user.emailAlreadyExists);

  return true;
};

exports.throwErrorIfUsernameAlreadyExists = async (username) => {
  const user = await userRepository.getUserByUsername(username);
  if (user) throw Boom.conflict(message.error.user.usernameAlreadyExists);

  return true;
};
