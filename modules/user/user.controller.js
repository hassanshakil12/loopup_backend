const asyncHandler = require("express-async-handler");

// Services
const userService = require("./user.service");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const data = await userService.getAllUsers(req.query.filters);

  res.status(200).json(data);
});

exports.getUsersWithPagination = asyncHandler(async (req, res) => {
  const payload = {
    filters: req.query.filters,
    page: req.query.page,
    pageSize: req.query.pageSize,
    sort: req.query.sort,
  };

  const data = await userService.getUsersWithPagination(payload);

  res.status(200).json(data);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const data = await userService.getUserById(req.params.id);

  res.status(200).json(data);
});

exports.createUser = asyncHandler(async (req, res) => {
  const payload = {
    user: req.user._id,
    isNotification: req.body.isNotification,
  };

  const data = await userService.createUser(payload);

  res.status(200).json(data);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const payload = {
    id: req.params.id,
    isNotification: req.body.isNotification,
  };

  const data = await userService.updateUser(payload);

  res.status(200).json(data);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const data = await userService.deleteUser(req.params.id);

  res.status(200).json(data);
});
