const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

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
    User.findById(req.signedCookies.userId, (err, user) => {
      const { name, price, description } = req.body;
      const thumbnail = req.file
        ? "/" + req.file.path.split("\\").slice(-3).join("/")
        : "/img/white-image.png";

      Product.create({
        name,
        author: user.name,
        author_id: user._id,
        image: thumbnail,
        price,
        description,
      })
        .then(() => {
          console.log("Create product successfully");
          res.redirect("/user/my-products/" + user._id);
        })
        .catch(next);
    });
  }
}

module.exports = new CreateProduct();
