const express = require("express");
const router = express.Router();
const cartController = require("../../../controllers/users/cart.controller.js");

router.get("/user/my-cart/:id", cartController.show);
router.delete("/products/books/remove-item/:slug", cartController.deleteItem);

module.exports = router;
