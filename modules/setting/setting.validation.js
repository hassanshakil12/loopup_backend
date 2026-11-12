const Boom = require("@hapi/boom");

// Repositories
const settingRepository = require("./setting.repository");

// Constants
const { MESSAGE: message } = require("../../common/constants");

exports.throwErrorIfSettingDoesNotExist = async (settingId) => {
  const setting = await settingRepository.getSettingById(settingId);
  if (!setting) throw Boom.notFound(message.error.setting.notFound);

  return setting;
};

exports.throwErrorIfSettingDoesNotExistByUserId = async (userId) => {
  const setting = await settingRepository.getSettingByUserId(userId);
  if (!setting) throw Boom.notFound(message.error.setting.notFound);

  return setting;
};
