const md5 = require("md5");
const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");

class MyAccount {
  showInformation(req, res, next) {
    User.findById(req.params.id, (err, user) => {
      res.render("myAccount.pug", { user });
    });
  }

  checkPassword(req, res, next) {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      const { name, email } = req.body;
      const errors = [];
      const userPassword = md5(req.body.password);
      if (user) {
        if (req.body.password !== "") {
          if (user.password !== userPassword) {
            errors.push("Your password is incorrect.");
          }
        } else {
          errors.push("the field current password is empty.");
        }
        if (name === "") {
          errors.push("the field name is empty.");
        }
        if (email !== "") {
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!regex.test(email)) {
            errors.push("You have entered an invalid email address!");
          }
        } else {
          errors.push("the field email is empty.");
        }
      }
      if (errors.length > 0) {
        res.render("myAccount.pug", {
          errors,
          user,
        });
        return;
      }
      next();
    });
  }
  updateInformation(req, res, next) {
    const userId = req.params.id;
    const { name, email } = req.body;
    User.updateOne({ _id: userId }, { name, email })
      .then(() => {
        User.findById(userId, (err, user) => {
          Product.updateMany({ author_id: user._id }, { author: name }).then(
            () => {
              res.redirect(`/user/${userId}`);
            }
          );
        });
      })
      .catch(next);
  }
  updateAvatar(req, res, next) {
    const avatar = "/" + req.file.path.split("\\").slice(-3).join("/");
    const userId = req.params.id;
    User.updateOne({ _id: userId }, { avatarUrl: avatar })
      .then(() => {
        res.redirect(`/user/my-account/${userId}`);
      })
      .catch(next);
  }
}

module.exports = new MyAccount();
