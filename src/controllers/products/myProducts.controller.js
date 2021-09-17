const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

class MyProducts {
  show(req, res, next) {
    User.findById(req.signedCookies.userId, (err, user) => {
      Product.find({ author_id: user._id }, (err, products) => {
        res.render("myProducts.pug", {
          products,
          user,
        });
      });
    });
  }
}

module.exports = new MyProducts();
