const Joi = require("joi");

// Constants
const REGEX = require("../../../constants/REGEX");

const baseSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string()
    .regex(REGEX.AUTH.USERNAME.PATTERN)
    .message(REGEX.AUTH.USERNAME.MESSAGE),
  password: Joi.string()
    .regex(REGEX.AUTH.PASSWORD.PATTERN)
    .message(REGEX.AUTH.PASSWORD.MESSAGE),
  isBlocked: Joi.boolean(),
});

exports.login = baseSchema
  .fork(["password"], (schema) => schema.required())
  .xor("email", "username")
  .required();
