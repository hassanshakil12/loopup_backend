const Joi = require("joi");

// Configs
const { objectId } = require("../../configs/joi");

const baseSchema = Joi.object({
  user: objectId,
  isNotification: Joi.boolean().default(true),
});

exports.getSettingById = objectId.required();

exports.createSetting = baseSchema.fork(["user"], (schema) =>
  schema.required(),
);

exports.updateSetting = baseSchema.append({ id: objectId.required() });
