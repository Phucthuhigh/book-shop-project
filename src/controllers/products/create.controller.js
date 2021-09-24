const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "phucthuhigh",
  api_key: 651455554929685,
  api_secret: "NRVPsA2-9Fuw6Rcg-ZV-qfN6T04",
});

class CreateProduct {
  renderCreateForm(req, res, next) {
    User.findById(req.signedCookies.userId, function (err, user) {
      res.render("createProduct.pug", { user });
    });
  }
  check(req, res, next) {
    const { name, price, description } = req.body;
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
    if (errors.length > 0) {
      User.findById({ _id: req.signedCookies.userId }, (err, user) => {
        res.render("createProduct.pug", { user, errors, value: req.body });
        return;
      });
    }
    next();
  }
  send(req, res, next) {
    cloudinary.uploader.upload(req.file.path, (thumbnail) => {
      User.findById(req.signedCookies.userId, (err, user) => {
        const { name, price, description } = req.body;
        Product.create({
          name,
          author: user.name,
          author_id: user._id,
          image: thumbnail
            ? thumbnail.url
            : "https://res.cloudinary.com/phucthuhigh/image/upload/v1632475202/white-image_d7xrv1.png",
          price,
          description,
        })
          .then(() => {
            console.log("Create product successfully");
            res.redirect("/user/my-products/" + user._id);
          })
          .catch(next);
      });
    });
  }
}

module.exports = new CreateProduct();
