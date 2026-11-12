const express = require("express");
const router = express.Router();

// Controllers
const settingController = require("./setting.controller");

router
  .route("/")
  .get(settingController.getSettingsWithPagination)
  .post(settingController.createSetting);
router.route("/all").get(settingController.getAllSettings);
router
  .route("/:id")
  .get(settingController.getSettingById)
  .patch(settingController.updateSetting)
  .delete(settingController.deleteSetting);

module.exports = router;
