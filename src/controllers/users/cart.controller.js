const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

class cartController {
  async show(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.signedCookies.userId });
      res.render("cart.pug", {
        user,
        cart: user.cart.items,
        successAddtoCart: req.flash("success"),
        errorAddtoCart: req.flash("error"),
        successDeleteItem: req.flash("successDeleteItem"),
        errorDeleteItem: req.flash("errorDeleteItem"),
      });
      // console.log(user.cart.items);
    } catch (error) {
      console.log(error);
    }
  }
  deleteItem(req, res, next) {
    Product.findOne({ slug: req.params.slug }, function (err, product) {
      User.findById(req.signedCookies.userId, function (err, user) {
        if (user) {
          user
            .deleteItem(product)
            .then(() => {
              req.flash("successDeleteItem", "Delete item successfully");
              res.redirect("back");
            })
            .catch(() => {
              req.flash("errorDeleteItem", "Delete item failure");
              res.redirect("back");
            });
        }
      });
    });
  }
}
module.exports = new cartController();
