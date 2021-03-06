const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

String.prototype.replaceAll = function (str1, str2) {
  const newString = this.split(str1).join(str2);
  return newString;
};

class HomeController {
  show(req, res) {
    User.findById(req.signedCookies.userId).then((user) => {
      Product.find({}, (err, products) => {
        let page = req.query.page || 1;
        let perPage = 8;
        let start = (page - 1) * perPage;
        let end = page * perPage;
        let productsLength = products.length;
        res.render("home.pug", {
          user,
          products: products.slice(start, end),
          page,
          productsLength,
          success: req.flash("success"),
          loginSuccess: req.flash("loginSuccess"),
          error: req.flash("error"),
        });
      });
    });
  }

  search(req, res, next) {
    User.findById(req.signedCookies.userId, (err, user) => {
      Product.find({}, (err, products) => {
        let filterProducts = products.filter((product) => {
          if (product) {
            return (
              product.name
                .toLowerCase()
                .replaceAll(" ", "")
                .indexOf(
                  req.query.query
                    ? req.query.query.toLowerCase().replaceAll(" ", "")
                    : ""
                ) != -1
            );
          }
        });
        let page = req.query.page || 1;
        let perPage = 8;
        let start = (page - 1) * perPage;
        let end = page * perPage;
        let productsLength = filterProducts.length;
        res.render("home.pug", {
          user,
          products: filterProducts.slice(start, end),
          page,
          productsLength,
          searchInput: req.query.query,
        });
      });
    });
  }

  addToCart(req, res, next) {
    Product.findOne({ slug: req.params.slug }, function (err, product) {
      User.findById(req.signedCookies.userId, function (err, user) {
        if (user) {
          user
            .addItem(product)
            .then(() => {
              req.flash("success", "Add to cart successfully");
              res.redirect("back");
            })
            .catch((err) => {
              req.flash("error", "Add to cart failure");
              console.log(err);
              res.redirect("back");
            });
        }
      });
    });
  }
}

module.exports = new HomeController();
