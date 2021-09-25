const express = require("express");
const router = express.Router();
const deleteController = require("../../../controllers/products/delete.controller");

router.delete("/delete/product/:slug", deleteController.deleteProduct);

module.exports = router;
