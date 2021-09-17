const Product = require("../../databases/models/products");
const User = require("../../databases/models/users");

class DetailProduct {
  showProduct(req, res, next) {
    User.findById(req.signedCookies.userId, (err, user) => {
      Product.findOne({ slug: req.params.slug }, (err, product) => {
        res.render("detail.pug", {
          product,
          user,
          success: req.flash("success"),
          error: req.flash("error"),
        });
        // res.json({ proc: product, user });
      });
    });
  }
}

module.exports = new DetailProduct();
