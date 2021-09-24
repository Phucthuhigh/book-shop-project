const express = require("express");
const router = express.Router();
const myAccount = require("../../../controllers/users/myAccount.controller");
const authMiddleware = require("../../../middlewares/requireAuth.middleware");

router.get(
  "/user/my-account/:id",
  authMiddleware.queryIdAuth,
  myAccount.showInformation
);
router.put(
  "/user/update/:id",
  myAccount.checkPassword,
  myAccount.updateInformation
);
router.put(
  "/user/update/avatar/:id",
  // upload.single("avatar"),
  myAccount.updateAvatar
);

module.exports = router;
