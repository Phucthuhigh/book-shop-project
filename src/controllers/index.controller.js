const User = require("../databases/models/users");

class IndexController {
  goToShop(req, res) {
    User.findById(req.signedCookies.userId).then((user) => {
      res.render("index.pug", {
        user,
      });
    });
  }
}

module.exports = new IndexController();
