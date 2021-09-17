const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarUrl: { type: String, default: "/img/first-avt.png" },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String },
        price: { type: Number },
        slug_product: { type: String },
        qty: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, default: 0 },
  },
  CreatedAt: { type: Date, default: Date.now },
});

User.methods.addItem = async function (product) {
  let cart = this.cart;
  if (cart.items.length == 0) {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      slug_product: product.slug.toString(),
      qty: 1,
    });
    cart.totalPrice = product.price;
  } else {
    const isExist = cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );
    if (isExist === -1) {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        slug_product: product.slug.toString(),
        qty: 1,
      });
      cart.totalPrice += product.price;
    } else {
      const existItemInCart = cart.items[isExist];
      existItemInCart.qty += 1;
      cart.totalPrice += product.price;
    }
  }
  // console.log(this);
  return this.save();
};

User.methods.deleteItem = function (product) {
  let cart = this.cart;
  if (cart.items.length > 0) {
    const isExist = cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );
    if (isExist !== -1) {
      if (cart.items[isExist].qty <= 1) {
        cart.items.splice(isExist, 1);
        cart.totalPrice -= product.price;
      } else {
        cart.items[isExist].qty -= 1;
        cart.totalPrice -= product.price;
      }
    }
  }

  return this.save();
};

module.exports = mongoose.model("User", User);
