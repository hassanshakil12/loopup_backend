const { rateLimit } = require("express-rate-limit");
const { env } = require("../configs");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

module.exports = rateLimiter;
