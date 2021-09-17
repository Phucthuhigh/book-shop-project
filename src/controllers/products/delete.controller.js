const Product = require("../../databases/models/products");

class DeleteProduct {
  deleteProduct(req, res, next) {
    Product.delete({ slug: req.params.slug })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new DeleteProduct();
