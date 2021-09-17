const User = require("../databases/models/users");

module.exports.page404Controller = (req, res, next) => {
  User.findById(req.signedCookies.userId).then((user) => {
    res.render("404.pug", { user });
  });
};
