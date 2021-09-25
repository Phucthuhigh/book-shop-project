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

  check(req, res, next) {
    const userId = req.params.id;
    const errors = [];
    User.findById(userId, function (err, user) {
      if (user.password !== md5(req.body.password)) {
        errors.push("Password incorrect");
      } else {
        if (req.body.email) {
          User.findOne({ email: req.body.email }, function (err, user) {
            if (user) {
              errors.push("Email has already existed");
            }
            if (errors.length > 0) {
              req.flash("error", errors[0]);
              res.redirect("back");
            } else {
              req.flash("success", "Change email successfully");
              next();
            }
          });
        } else if (req.body.name) {
          User.findOne({ name: req.body.name }, function (err, user) {
            if (user) {
              errors.push("Name has already existed");
            }
            if (errors.length > 0) {
              req.flash("error", errors[0]);
              res.redirect("back");
            } else {
              req.flash("success", "Change name successfully");
              next();
            }
          });
        }
      }

      if (errors.length > 0) {
        req.flash("error", errors[0]);
        res.redirect("back");
      }
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
