const indexRouter = require("./components/index.route");
const homeRouter = require("./components/products/home.route");
const searchRouter = require("./components/products/search.route");
const authMiddleware = require("../middlewares/requireAuth.middleware");
const myAccountRouter = require("./components/users/myAccount.route");
const myProductsRouter = require("./components/products/myProducts.route");
const createProductRouter = require("./components/products/create.route");
const deleteProductRouter = require("./components/products/delete.route");
const changeProductRouter = require("./components/products/change.route");
const detailProductRouter = require("./components/products/detail.route");
const cartRouter = require("./components/users/cart.route");
const userRouter = require("./components/users/user.route");

function route(app) {
  app.use("/", indexRouter);
  app.use("/", homeRouter);
  app.use("/", searchRouter);
  app.use("/", userRouter);
  app.use("/", authMiddleware.requireAuth, myAccountRouter);
  app.use("/", authMiddleware.requireAuth, myProductsRouter);
  app.use("/", authMiddleware.requireAuth, createProductRouter);
  app.use("/", authMiddleware.requireAuth, deleteProductRouter);
  app.use("/", authMiddleware.requireAuth, changeProductRouter);
  app.use("/", authMiddleware.requireAuth, cartRouter);
  app.use("/", detailProductRouter);
}

module.exports = route;
