const Profile = require("../models/Profile");

const POPULATION_PIPELINE = [{ path: "user" }];

exports.getAllProfiles = async (filters) => {
  return Profile.find(filters).populate(POPULATION_PIPELINE).lean();
};

exports.getProfilesWithPagination = async (filters, offset, limit, sort) => {
  return Profile.find(filters)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .populate(POPULATION_PIPELINE)
    .lean();
};

exports.getProfilesCount = async (filters) => {
  return Profile.countDocuments(filters);
};

exports.getProfileById = async (profileId) => {
  return Profile.findById(profileId).populate(POPULATION_PIPELINE).lean();
};

exports.getProfileByUserId = async (userId) => {
  return Profile.findOne({ user: userId }).populate(POPULATION_PIPELINE).lean();
};

exports.createProfile = async (payload) => {
  return Profile.create(payload);
};

exports.updateProfile = async (profileId, payload) => {
  return Profile.findByIdAndUpdate(profileId, payload, {
    returnDocument: "after",
  });
};

exports.deleteProfile = async (profileId) => {
  return Profile.findByIdAndDelete(profileId);
};
