const Product = require("../../databases/models/products");

class HomeController {
  show(req, res) {
    Product.find({}, (err, products) => {
      let page = req.query.page || 1;
      let perPage = 12;
      let start = (page - 1) * perPage;
      let end = page * perPage;
      res.json({
        products: [...products.slice(start, end)],
      });
    });
  }

  search(req, res, next) {
    Product.find({}, (err, products) => {
      let filterProducts = products.filter((product) => {
        if (product) {
          return (
            product.name
              .toLowerCase()
              .indexOf(req.query.query ? req.query.query.toLowerCase() : "") !=
            -1
          );
        }
      });
      let page = req.query.page || 1;
      let perPage = 12;
      let start = (page - 1) * perPage;
      let end = page * perPage;
      res.json({
        products: [...filterProducts.slice(start, end)],
      });
    });
  }
}

module.exports = new HomeController();
