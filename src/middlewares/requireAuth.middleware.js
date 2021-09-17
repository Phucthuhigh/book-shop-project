const User = require("../databases/models/users");

module.exports.requireAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect("/user/login");
    return;
  }

  User.findById(req.signedCookies.userId, (err, user) => {
    if (!user) {
      res.redirect("/user/login");
      return;
    }

    next();
  });
};
module.exports.queryIdAuth = function (req, res, next) {
  if (req.params.id !== req.signedCookies.userId) {
    res.redirect("/404");
    return;
  }
  next();
};
