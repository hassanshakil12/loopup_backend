const asyncHandler = require("express-async-handler");

// Services
const authService = require("../services/authService");

exports.login = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: Req.body.password,
  };

  const data = await authService.login(payload);

  res.status(200).json(data);
});

exports.register = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: Req.body.password,
  };

  const data = await authService.register(payload);

  res.status(200).json(data);
});

exports.logout = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: Req.body.password,
  };

  const data = await authService.logout(payload);

  res.status(200).json(data);
});

exports.changePassword = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: Req.body.password,
  };

  const data = await authService.changePassword(payload);

  res.status(200).json(data);
});
