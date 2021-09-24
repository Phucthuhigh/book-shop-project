const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/users/user.controller.js");
const authMiddleware = require("../../../middlewares/requireAuth.middleware");

router.get("/user/:id", authMiddleware.queryIdUserAuth, userController.show);

module.exports = router;
