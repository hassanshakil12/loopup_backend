// Repositories
const settingRepository = require("./setting.repository");

// Validations
const joi = require("../../configs/joi");
const joiSchema = require("./setting.schema");
const settingValidation = require("./setting.validation");
const userValidation = require("../user/user.validation");

exports.getAllSettings = async (filters) => {
  return settingRepository.getAllSettings(filters);
};

exports.getSettingsWithPagination = async (payload) => {
  const { filters, page, pageSize, sort } = payload;
  const offset = (page - 1) * pageSize;

  const [settings, settingsCount] = await Promise.all([
    settingRepository.getSettingsWithPagination(
      filters,
      offset,
      pageSize,
      sort,
    ),
    settingRepository.getSettingsCount(filters),
  ]);

  const meta = {
    page,
    pageSize,
    totalPages: Math.ceil(settingsCount / pageSize),
    totalCount: settingsCount,
  };

  return { data: settings, meta };
};

exports.getSettingById = async (id) => {
  joi.validate(id, joiSchema.getSettingById);

  return settingValidation.throwErrorIfSettingDoesNotExist(id);
};

exports.createSetting = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.createSetting);

  await userValidation.throwErrorIfEmailDoesNotExist(validatedPayload.user);

  return settingRepository.createSetting(validatedPayload);
};

exports.updateSetting = async (payload) => {
  const validatedPayload = joi.validate(payload, joiSchema.updateSetting);

  const existingSetting =
    await settingValidation.throwErrorIfSettingDoesNotExist(
      validatedPayload.id,
    );

  const updatePayload = {};

  if (
    Object.hasOwn(validatedPayload, "isNotification") &&
    validatedPayload.isNotification !== existingSetting.isNotification
  ) {
    updatePayload.isNotification = validatedPayload.isNotification;
  }

  if (!Object.keys(updatePayload).length) return existingSetting;

  return settingRepository.updateSetting(validatedPayload.id, updatePayload);
};

// TODO: Need to make it more better
exports.deleteSetting = async (id) => {
  joi.validate(id, joiSchema.getSettingById);

  await settingValidation.throwErrorIfSettingDoesNotExist(id);

  await settingRepository.deleteSetting(id);
  return { deletedId: id };
};
