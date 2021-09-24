const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://Phucthuhigh:17012007@book-shop.fj408.mongodb.net/myFirstDatabase"
    );
    console.log("Connected to Database successfully");
  } catch (error) {
    console.error("Connected to Database failure");
  }
}

module.exports = { connect };
