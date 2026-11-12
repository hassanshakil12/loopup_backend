const express = require("express");
const router = express.Router();

// Constants
const { MODELS } = require("../common/constants");

// Middlewares
const protect = require("../middlewares/authentication");

const routes = [
  {
    path: "/users",
    resource: MODELS.USER,
    module: require("./user/user.route"),
  },
  {
    path: "/settings",
    resource: MODELS.SETTINGS,
    module: require("./setting/setting.route"),
  },
  {
    path: "/profiles",
    resource: MODELS.PROFILE,
    module: require("./profile/profile.route"),
  },
];

routes.forEach((route) => {
  const middlewares = [protect];

  if (route.resource) {
  }

  router.use(route.path, ...middlewares, route.module);
});

router.use("/auth", require("./auth/auth.route"));

module.exports = router;
