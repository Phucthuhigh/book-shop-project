const express = require("express");
const router = express.Router();
const homeController = require("../../../controllers/products/home.controller");

router.get("/products/books/search", homeController.search);

module.exports = router;
