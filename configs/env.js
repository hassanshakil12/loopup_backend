const dotenv = require("dotenv");
const Joi = require("joi");

const envFile =
  process.env.NODE_ENV === "production" ? ".env" : ".env.development";

dotenv.config({ path: envFile });

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string().valid("development", "production").required(),
  MONGODB_URI: Joi.string().required(),
  API_VERSION: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  ENCRYPTION_KEY: Joi.string().required(),
  ENCRYPTION_ALGORITHM: Joi.string().required(),
  ENCRYPTION_KEY_LENGTH: Joi.number().required(),
  ENCRYPTION_IV_LENGTH: Joi.number().required(),
  ENCRYPTION_SALT_LENGTH: Joi.number().required(),
  ENCRYPTION_TAG_LENGTH: Joi.number().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const env = {
  PORT: envVars.PORT,
  NODE: {
    ENV: envVars.NODE_ENV,
  },
  MONGODB: {
    URI: envVars.MONGODB_URI,
  },
  API: {
    VERSION: envVars.API_VERSION,
  },
  JWT: {
    ACCESS_TOKEN_SECRET: envVars.JWT_ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION: envVars.JWT_ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_SECRET: envVars.JWT_REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRATION: envVars.JWT_REFRESH_TOKEN_EXPIRATION,
  },
  ENCRYPTION: {
    KEY: envVars.ENCRYPTION_KEY,
    ALGORITHM: envVars.ENCRYPTION_ALGORITHM,
    KEY_LENGTH: envVars.ENCRYPTION_KEY_LENGTH,
    IV_LENGTH: envVars.ENCRYPTION_IV_LENGTH,
    SALT_LENGTH: envVars.ENCRYPTION_SALT_LENGTH,
    TAG_LENGTH: envVars.ENCRYPTION_TAG_LENGTH,
  },
};

module.exports = env;
