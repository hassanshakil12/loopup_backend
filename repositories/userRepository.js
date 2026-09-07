const User = require("../models/User");

exports.getAllUsers = async (filters) => {
  return User.find(filters).lean();
};

exports.getUserWithPagination = async (filters, offset, limit, sort) => {
  return User.find(filters).skip(offset).limit(limit).sort(sort).lean();
};

exports.getUsersCount = async (filters) => {
  return User.countDocuments(filters);
};

exports.getUserById = async (userId) => {
  return User.findById(UserId).lean();
};

exports.getUserByEmail = async (email) => {
  return User.findOne({ email }).lean();
};

exports.getUserByUsername = async (username) => {
  return User.findOne({ username }).lean();
};

exports.getUserById = async (userId) => {
  return User.findById(userId).lean();
};

exports.createUser = async (payload) => {
  return User.create(payload);
};

exports.updateUser = async (userId, payload) => {
  return User.findByIdAndUpdate(userId, payload, { returnDocument: "after" });
};

exports.deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};
