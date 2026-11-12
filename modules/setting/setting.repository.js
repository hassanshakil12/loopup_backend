const Setting = require("./setting.model");

const POPULATION_PIPELINE = [{ path: "user" }];

exports.getAllSettings = async (filters) => {
  return Setting.find(filters).populate(POPULATION_PIPELINE).lean();
};

exports.getSettingsWithPagination = async (filters, offset, limit, sort) => {
  return Setting.find(filters)
    .skip(offset)
    .limit(limit)
    .sort(sort)
    .populate(POPULATION_PIPELINE)
    .lean();
};

exports.getSettingsCount = async (filters) => {
  return Setting.countDocuments(filters);
};

exports.getSettingById = async (settingId) => {
  return Setting.findById(settingId).populate(POPULATION_PIPELINE).lean();
};

exports.getSettingByUserId = async (userId) => {
  return Setting.findOne({ user: userId }).populate(POPULATION_PIPELINE).lean();
};

exports.createSetting = async (payload) => {
  return Setting.create(payload);
};

exports.updateSetting = async (settingId, payload) => {
  return Setting.findByIdAndUpdate(settingId, payload, {
    returnDocument: "after",
  });
};

exports.deleteSetting = async (settingId) => {
  return Setting.findByIdAndDelete(settingId);
};
