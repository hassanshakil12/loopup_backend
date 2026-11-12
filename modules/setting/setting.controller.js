const asyncHandler = require("express-async-handler");

// Services
const settingService = require("./setting.service");

exports.getAllSettings = asyncHandler(async (req, res) => {
  const data = await settingService.getAllSettings(req.query.filters);

  res.status(200).json(data);
});

exports.getSettingsWithPagination = asyncHandler(async (req, res) => {
  const payload = {
    filters: req.query.filters,
    page: req.query.page,
    pageSize: req.query.pageSize,
    sort: req.query.sort,
  };

  const data = await settingService.getSettingsWithPagination(payload);

  res.status(200).json(data);
});

exports.getSettingById = asyncHandler(async (req, res) => {
  const data = await settingService.getSettingById(req.params.id);

  res.status(200).json(data);
});

exports.createSetting = asyncHandler(async (req, res) => {
  const payload = {
    user: req.user._id,
    isNotification: req.body.isNotification,
  };

  const data = await settingService.createSetting(payload);

  res.status(200).json(data);
});

exports.updateSetting = asyncHandler(async (req, res) => {
  const payload = {
    id: req.params.id,
    isNotification: req.body.isNotification,
  };

  const data = await settingService.updateSetting(payload);

  res.status(200).json(data);
});

exports.deleteSetting = asyncHandler(async (req, res) => {
  const data = await settingService.deleteSetting(req.params.id);

  res.status(200).json(data);
});
