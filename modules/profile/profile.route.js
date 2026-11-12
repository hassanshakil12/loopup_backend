const express = require("express");
const router = express.Router();

// Controllers
const profileController = require("./profile.controller");

router
  .route("/")
  .get(profileController.getProfilesWithPagination)
  .post(profileController.createProfile);
router.route("/all").get(profileController.getAllProfiles);
router
  .route("/:id")
  .get(profileController.getProfileById)
  .patch(profileController.updateProfile)
  .delete(profileController.deleteProfile);

module.exports = router;
