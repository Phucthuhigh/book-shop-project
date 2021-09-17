const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controller");

router.get("/products/books", productController.show);
router.get("/products/books/search", productController.search);

module.exports = router;
