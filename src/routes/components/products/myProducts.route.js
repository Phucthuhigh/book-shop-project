const express = require("express");
const router = express.Router();
const myProductsController = require("../../../controllers/products/myProducts.controller");

router.get("/user/my-products/:id", myProductsController.show);

module.exports = router;
