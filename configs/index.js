const env = require("./env");
const { connectDB, disconnectDB } = require("./db");

module.exports = {
  env,
  connectDB,
  disconnectDB,
};
