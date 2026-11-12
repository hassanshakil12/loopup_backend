const Boom = require("@hapi/boom");
const crypto = require("crypto");

// Configs
const env = require("../../configs/env");

const ALGORITHM = env.ENCRYPTION.ALGORITHM;
const KEY_LENGTH = env.ENCRYPTION.KEY_LENGTH;
const IV_LENGTH = env.ENCRYPTION.IV_LENGTH;
const SALT_LENGTH = env.ENCRYPTION.SALT_LENGTH;
const TAG_LENGTH = env.ENCRYPTION.TAG_LENGTH;
const SCRYPT_OPTIONS = {
  N: 1 << 17,
  r: 8,
  p: 1,
  maxmem: 256 * 1024 * 1024,
};

async function encrypt(data, password) {
  if (typeof password !== "string" || password.length < 16) {
    throw Boom.badRequest("Password must be at least 16 characters long");
  }

  const plaintext = Buffer.from(JSON.stringify(data), "utf8");

  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);

  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      SCRYPT_OPTIONS,
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: TAG_LENGTH,
  });

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);

  const authTag = cipher.getAuthTag();

  return [
    "v1",
    salt.toString("base64url"),
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

async function decrypt(encryptedData, password) {
  if (typeof encryptedData !== "string") {
    throw Boom.badRequest("Encrypted data must be a string");
  }

  if (typeof password !== "string" || password.length < 16) {
    throw Boom.badRequest("Password must be at least 16 characters long");
  }

  const parts = encryptedData.split(".");

  if (parts.length !== 5 || parts[0] !== "v1") {
    throw Boom.badRequest("Invalid encrypted data format");
  }

  const [, saltString, ivString, authTagString, encryptedString] = parts;

  const salt = Buffer.from(saltString, "base64url");
  const iv = Buffer.from(ivString, "base64url");
  const authTag = Buffer.from(authTagString, "base64url");
  const encrypted = Buffer.from(encryptedString, "base64url");

  if (
    salt.length !== SALT_LENGTH ||
    iv.length !== IV_LENGTH ||
    authTag.length !== TAG_LENGTH
  ) {
    throw Boom.badRequest("Invalid encrypted data");
  }

  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      KEY_LENGTH,
      SCRYPT_OPTIONS,
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      },
    );
  });

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: TAG_LENGTH,
  });

  decipher.setAuthTag(authTag);

  try {
    const plaintext = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    return JSON.parse(plaintext.toString("utf8"));
  } catch {
    throw Boom.badRequest("Unable to decrypt data");
  }
}

module.exports = {
  encrypt,
  decrypt,
};
