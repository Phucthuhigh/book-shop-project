const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/book-shop");
    console.log("Connected to Database successfully");
  } catch (error) {
    console.error("Connected to Database failure");
  }
}

module.exports = { connect };
