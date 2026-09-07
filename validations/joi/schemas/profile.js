const Joi = require("joi");
const { objectId } = require("../index");

// Constants
const ENUMS = require("../../../constants/ENUMS");

const baseSchema = Joi.object({
  user: objectId,
  title: Joi.string().trim().lowercase().min(3).max(255),
  imgUrl: Joi.string().uri().trim(),
  age: Joi.number().min(0),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.values(ENUMS.PROFILE.GENDER)),
  phone: Joi.string().trim(),
  bio: Joi.string().trim().lowercase(),
  addresses: Joi.array().items(
    Joi.object({
      type: Joi.string().valid(...Object.values(ENUMS.PROFILE.ADDRESS_TYPE)),
      street: Joi.string().trim().lowercase(),
      city: Joi.string().trim().lowercase(),
      state: Joi.string().trim().lowercase(),
      country: Joi.string().trim().lowercase(),
      zipCode: Joi.string().trim().lowercase(),
    }),
  ),
  isPublic: Joi.boolean().default(false),
});

exports.getProfileById = objectId.required();

exports.createProfile = baseSchema.fork(
  ["user", "title", "dateOfBirth", "gender"],
  (schema) => schema.required(),
);

exports.updateProfile = baseSchema.append({ id: objectId.required() });
