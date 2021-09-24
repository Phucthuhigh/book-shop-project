const Product = require("../../databases/models/products");
const User = require("../../databases/models/users");

class DeleteProduct {
  deleteProduct(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((product) => {
        User.find({}, async (err, users) => {
          await users.forEach(async (user) => {
            await user.removeAllItem(product);
          });
          Product.delete({ slug: req.params.slug }).then(() =>
            res.redirect("back")
          );
        });
      })
      .catch(next);
  }
}

module.exports = new DeleteProduct();
