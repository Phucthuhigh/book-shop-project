const md5 = require("md5");
const User = require("../../databases/models/users");
const Product = require("../../databases/models/products");
const Formidable = require("formidable");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "phucthuhigh",
  api_key: 651455554929685,
  api_secret: "NRVPsA2-9Fuw6Rcg-ZV-qfN6T04",
});

class MyAccount {
  showInformation(req, res, next) {
    User.findById(req.params.id, (err, user) => {
      res.render("myAccount.pug", {
        user,
        error: req.flash("error"),
        success: req.flash("success"),
      });
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
      User.findOne({ email: email }, function (err, user) {
        if (errors.length == 0) {
          if (user) {
            req.flash("error", "Wrong email address or name or password.");
            res.redirect("back");
          } else {
            req.flash("success", "Successfully change email address.");
            next();
          }
        } else {
          req.flash("error", "Wrong email address or name or password.");
          res.redirect("back");
        }
      });
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
              res.redirect(`/user/my-account/${userId}`);
            }
          );
        });
      })
      .catch(next);
  }
  updateAvatar(req, res, next) {
    cloudinary.uploader.upload(req.file.path, (avatar) => {
      const userId = req.params.id;
      User.updateOne({ _id: userId }, { avatarUrl: avatar.url })
        .then(() => {
          res.redirect(`/user/my-account/${userId}`);
        })
        .catch(next);
    });
  }
}

module.exports = new MyAccount();
