const express = require("express");
const router = express.Router();
const homeController = require("../../../controllers/products/home.controller");
const authMiddleware = require("../../../middlewares/requireAuth.middleware");

router.get("/products/books", homeController.show);
router.put(
  "/products/books/add-to-cart/:slug",
  authMiddleware.requireAuth,
  homeController.addToCart
);

module.exports = router;
