const express = require("express");
const router = express.Router();
const myAccount = require("../../../controllers/users/myAccount.controller");
const authMiddleware = require("../../../middlewares/requireAuth.middleware");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../../public", "uploads", "avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get(
  "/user/my-account/:id",
  authMiddleware.queryIdAuth,
  myAccount.showInformation
);
router.put("/user/update/:id", myAccount.check, myAccount.updateInformation);
router.put(
  "/user/update/avatar/:id",
  upload.single("avatar"),
  myAccount.updateAvatar
);

module.exports = router;
