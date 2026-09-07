const Joi = require("joi");
const { objectId } = require("../index");

// Constants
const ENUMS = require("../../../constants/ENUMS");
const REGEX = require("../../../constants/REGEX");

const baseSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string()
    .regex(REGEX.AUTH.USERNAME.PATTERN)
    .message(REGEX.AUTH.USERNAME.MESSAGE),
  password: Joi.string()
    .regex(REGEX.AUTH.PASSWORD.PATTERN)
    .message(REGEX.AUTH.PASSWORD.MESSAGE),

  title: Joi.string().trim().lowercase().min(3).max(255),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.values(ENUMS.PROFILE.GENDER)),
});

exports.login = baseSchema
  .fork(["password"], (schema) => schema.required())
  .xor("email", "username")
  .required();

exports.register = baseSchema.fork(
  ["email", "username", "password", "title", "dateOfBirth", "gender"],
  (schema) => schema.required(),
);
