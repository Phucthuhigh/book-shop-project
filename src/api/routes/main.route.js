const productRoute = require("./components/product.route");
function routeApi(app) {
  app.use("/api/", productRoute);
}

module.exports = routeApi;
