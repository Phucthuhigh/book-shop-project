const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

class UserController {
  show(req, res, next) {
    User.findById(req.signedCookies.userId).then((user) => {
      User.findById(req.params.id).then((viewUser) => {
        Product.find({ author_id: req.params.id }).then((products) => {
          res.render("viewUser.pug", { user, viewUser, products });
        });
      });
    });
  }
}

module.exports = new UserController();
