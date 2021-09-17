const express = require("express");
const router = express.Router();
const changeController = require("../../../controllers/products/change.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.resolve(__dirname, "../../../public", "uploads", "thumbnailProducts")
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get("/product/update/:slug", changeController.renderChangeForm);
router.put(
  "/product/update/:slug",
  upload.single("thumbnail"),
  changeController.check,
  changeController.send
);

module.exports = router;
