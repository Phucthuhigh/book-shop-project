const express = require("express");
const router = express.Router();
const detailController = require("../../../controllers/products/detail.controller");
const authMiddleware = require("../../../middlewares/requireAuth.middleware");

router.get(
  "/product/:slug",
  authMiddleware.querySlugProductAuth,
  detailController.showProduct
);

module.exports = router;
