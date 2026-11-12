const Boom = require("@hapi/boom");

// Repositories
const profileRepository = require("./profile.repository");

// Constants
const { MESSAGE: message } = require("../../common/constants");

exports.throwErrorIfProfileDoesNotExist = async (profileId) => {
  const profile = await profileRepository.getProfileById(profileId);
  if (!profile) throw Boom.notFound(message.error.profile.notFound);

  return profile;
};

exports.throwErrorIfProfileAlreadyExistsByUserId = async (userId) => {
  const profile = await profileRepository.getProfileByUserId(userId);
  if (profile) throw Boom.conflict(message.error.profile.alreadyExists);

  return true;
};

exports.throwErrorIfProfileDoesNotExistByUserId = async (userId) => {
  const profile = await profileRepository.getProfileByUserId(userId);
  if (!profile) throw Boom.notFound(message.error.profile.notFound);

  return profile;
};
