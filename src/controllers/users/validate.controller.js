const User = require("../../databases/models/users");
const md5 = require("md5");

class Validation {
  renderRegisterForm(req, res) {
    if (req.signedCookies.userId) {
      res.redirect("/products/books");
    } else {
      res.render("register");
    }
  }
  checkRegisterInput(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;
    const errors = [];
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
    if (password !== "") {
      if (password.length < 8) {
        errors.push("the password must be 8 or more in length.");
      } else {
        if (confirmPassword !== password) {
          errors.push(
            "Your confirmation password isn't same as the password you entered."
          );
        }
      }
    } else {
      errors.push("the field password is empty.");
    }
    User.findOne({ email }, (error, user) => {
      if (user) {
        errors.push("This email has already been created.");
      }
      if (errors.length > 0) {
        res.render("register", {
          errors,
          values: req.body,
        });
        return;
      }
      next();
    });
  }
  sendRegisterInput(req, res, next) {
    // Add a post
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password),
    })
      .then((user) => {
        console.log("Sign up successfully");
        req.flash("success", "Register successfully");
        res.redirect("/user/login");
      })
      .catch(next);
  }
  renderLoginForm(req, res) {
    if (req.signedCookies.userId) {
      res.redirect("/products/books");
    } else {
      res.render("login", { success: req.flash("success") });
    }
  }
  checkLoginInput(req, res, next) {
    const { email, password } = req.body;
    const errors = [];
    if (email === "") {
      errors.push("The email field is empty");
    } else {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(email)) {
        errors.push("You have entered an invalid email address!");
      }
    }
    if (password === "") {
      errors.push("The password field is empty");
    }
    if (errors.length === 0) {
      let hashPassword = md5(password);
      User.findOne({ email, password: hashPassword }, (err, user) => {
        if (!user) {
          errors.push("Wrong email or password! Please check again!!!");
        }
        if (errors.length > 0) {
          res.render("login", { errors, values: req.body });
          return;
        }
        next();
      });
    } else {
      res.render("login", { errors, values: req.body });
      return;
    }
  }
  sendLoginInput(req, res) {
    User.findOne({ email: req.body.email }).then((user) => {
      res.cookie("userId", user._id, {
        signed: true,
      });
      req.flash("loginSuccess", "Login successfully");
      res.redirect("/products/books");
      console.log("Login sucessfully");
    });
  }
}

module.exports = new Validation();
