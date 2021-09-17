const express = require("express");
const router = express.Router();
const page404 = require("../../controllers/404.controller");

router.get("/404", page404.page404Controller);

module.exports = router;
