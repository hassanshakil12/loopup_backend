const mongoose = require("mongoose");
const env = require("./env");

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB.URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed".bgRed);
  } catch (error) {
    console.error(error.message);
  }
};
