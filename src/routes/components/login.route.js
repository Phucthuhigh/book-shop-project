const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/users/validate.controller");

router.get("/user/login", homeController.renderLoginForm);
router.post(
  "/user/login",
  homeController.checkLoginInput,
  homeController.sendLoginInput
);

module.exports = router;
