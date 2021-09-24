const express = require("express");
const router = express.Router();
const createController = require("../../../controllers/products/create.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../../../public", "uploads", "thumbnailProducts")
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get("/product/create", createController.renderCreateForm);
router.post(
  "/product/create",
  upload.single("thumbnail"),
  createController.check,
  createController.send
);

module.exports = router;
