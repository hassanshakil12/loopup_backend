const asyncHandler = require("express-async-handler");

// Services
const authService = require("./auth.service");

exports.login = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  const { accessToken, refreshToken, ...data } =
    await authService.login(payload);

  res.cookie("accessToken", accessToken, {
    expires: true,
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    expires: true,
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(data);
});

exports.register = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    title: req.body.title,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
  };

  const data = await authService.register(payload);

  res.status(200).json(data);
});

exports.refresh = asyncHandler(async (req, res) => {
  const accessToken = await authService.refresh(req.cookies?.refreshToken);

  res.cookie("accessToken", accessToken, {
    expires: true,
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Token refreshed successfully" });
});

exports.logout = asyncHandler(async (req, res) => {
  const data = await authService.logout(req.user._id);

  res.clearCookie("accessToken", {
    expires: true,
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.clearCookie("refreshToken", {
    expires: true,
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(data);
});

exports.changePassword = asyncHandler(async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  const data = await authService.changePassword(payload);

  res.status(200).json(data);
});
