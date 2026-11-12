const asyncHandler = require("express-async-handler");

// Services
const profileService = require("./profile.service");

exports.getAllProfiles = asyncHandler(async (req, res) => {
  const data = await profileService.getAllProfiles(req.query.filters);

  res.status(200).json(data);
});

exports.getProfilesWithPagination = asyncHandler(async (req, res) => {
  const payload = {
    filters: req.query.filters,
    page: req.query.page,
    pageSize: req.query.pageSize,
    sort: req.query.sort,
  };

  const data = await profileService.getProfilesWithPagination(payload);

  res.status(200).json(data);
});

exports.getProfileById = asyncHandler(async (req, res) => {
  const data = await profileService.getProfileById(req.params.id);

  res.status(200).json(data);
});

exports.createProfile = asyncHandler(async (req, res) => {
  const payload = {};

  const data = await profileService.createProfile(payload);

  res.status(200).json(data);
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const payload = {};

  const data = await profileService.updateProfile(payload);

  res.status(200).json(data);
});

exports.deleteProfile = asyncHandler(async (req, res) => {
  const data = await profileService.deleteProfile(req.params.id);

  res.status(200).json(data);
});
