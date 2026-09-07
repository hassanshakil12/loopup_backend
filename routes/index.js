const express = require("express");
const router = express.Router();

// Middlewares
const protect = require("../middlewares/authentication");

const routes = [{ path: "/auth", module: require("./authRoutes") }];

routes.forEach((route) => {
  const middlewares = [];

  if (route.resource) {
    middlewares.push(protect);
  }

  router.use(route.path, ...middlewares, route.module);
});

module.exports = router;