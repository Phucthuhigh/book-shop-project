const express = require("express");
const router = express.Router();
const detailController = require("../../../controllers/products/detail.controller");

router.get("/product/:slug", detailController.showProduct);

module.exports = router;
