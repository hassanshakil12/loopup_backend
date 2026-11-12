const mongoose = require("mongoose");

// Constants
const { MODELS } = require("../../common/constants");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: [true, "user is required"],
    },
    isNotification: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.SETTING, schema);
