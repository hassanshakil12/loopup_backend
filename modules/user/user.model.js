const mongoose = require("mongoose");

// Constants
const { MODELS } = require("../../common/constants");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.USER, schema);
