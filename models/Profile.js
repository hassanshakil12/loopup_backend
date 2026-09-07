const mongoose = require("mongoose");

// Constants
const MODELS = require("../constants/MODELS");
const ENUMS = require("../constants/ENUMS");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MODELS.USER,
      required: [true, "user is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "title is required"],
    },
    imgUrl: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dxjv0gq3f/image/upload/v1690911685/loopup/default-profile-image.png",
    },
    age: {
      type: Number,
      min: [0, "age must be a positive number"],
      required: [true, "age is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "date of birth is required"],
    },
    gender: {
      type: String,
      enum: Object.values(ENUMS.PROFILE.GENDER),
      required: [true, "gender is required"],
    },
    phone: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      lowercase: true,
      trim: true,
    },
    addresses: [
      {
        _id: false,
        type: {
          type: String,
          enum: Object.values(ENUMS.PROFILE.ADDRESS_TYPE),
          required: [true, "address type is required"],
        },
        street: {
          type: String,
          lowercase: true,
          trim: true,
          required: [true, "street type is required"],
        },
        city: {
          type: String,
          lowercase: true,
          trim: true,
          required: [true, "city type is required"],
        },
        state: {
          type: String,
          lowercase: true,
          trim: true,
          required: [true, "state type is required"],
        },
        country: {
          type: String,
          lowercase: true,
          trim: true,
          required: [true, "country type is required"],
        },
        zipCode: {
          type: Number,
          required: [true, "zipCode type is required"],
        },
      },
    ],
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model(MODELS.PROFILE, schema);
