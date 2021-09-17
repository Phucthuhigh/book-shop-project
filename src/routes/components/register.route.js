const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/users/validate.controller");

router.get("/user/register", homeController.renderRegisterForm);
router.post(
  "/user/register",
  homeController.checkRegisterInput,
  homeController.sendRegisterInput
);

module.exports = router;
