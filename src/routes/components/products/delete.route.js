const express = require("express");
const router = express.Router();
const deleteController = require("../../../controllers/products/delete.controller");

router.delete("/product/delete/:slug", deleteController.deleteProduct);

module.exports = router;
