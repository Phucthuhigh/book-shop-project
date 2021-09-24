const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "phucthuhigh",
  api_key: 651455554929685,
  api_secret: "NRVPsA2-9Fuw6Rcg-ZV-qfN6T04",
});

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
    cloudinary.uploader.upload(req.file.path, (thumbnail) => {
      const { name, price, description } = req.body;
      Product.updateOne(
        { slug: req.params.slug },
        { name, price, description, image: thumbnail.url },
        function (err, product) {
          res.redirect(`/user/my-products/${req.signedCookies.userId}`);
        }
      );
    });
  }
}

module.exports = new ChangeController();
