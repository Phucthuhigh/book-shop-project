const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

class ChangeController {
  renderChangeForm(req, res, next) {
    User.findById(req.signedCookies.userId, function (err, user) {
      Product.findOne({ slug: req.params.slug }, function (err, product) {
        res.render("changeProduct.pug", {
          user,
          product,
        });
      });
    });
  }
  check(req, res, next) {
    Product.findOne({ slug: req.params.slug }, function (err, product) {
      const { name, price, description } = req.body;
      let thumbnail = req.file;
      const errors = [];
      if (name === "") {
        errors.push("The field name is empty.");
      }
      if (price === "") {
        errors.push("The field price is empty.");
      }
      if (description === "") {
        errors.push("The field description is empty.");
      }
      if (thumbnail === undefined) {
        thumbnail = product.image;
      } else {
        thumbnail = "/" + req.file.path.split("\\").slice(-3).join("/");
      }
      req.body.thumbnail = thumbnail;
      if (errors.length > 0) {
        User.findById(req.signedCookies.userId, function (err, user) {
          res.render("changeProduct.pug", {
            user,
            slug: product.slug,
            value: req.body,
            errors,
          });
          return;
        });
      }
      next();
    });
  }
  send(req, res, next) {
    const { name, price, description, thumbnail } = req.body;
    Product.updateOne(
      { slug: req.params.slug },
      { name, price, description, image: thumbnail },
      function (err, product) {
        res.redirect(`/user/my-products/${req.signedCookies.userId}`);
      }
    );
  }
}

module.exports = new ChangeController();
