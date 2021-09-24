const User = require("../databases/models/users");
const Product = require("../databases/models/products");

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

module.exports.querySlugProductAuth = function (req, res, next) {
  Product.findOne({ slug: req.params.slug }, function (err, product) {
    if (!product) {
      res.redirect("/404");
      return;
    }
    next();
  });
};
module.exports.queryIdUserAuth = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (!user) {
      res.redirect("/404");
      return;
    }
    next();
  });
};
