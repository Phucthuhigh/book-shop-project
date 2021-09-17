const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

async function connect() {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to Database successfully");
  } catch (error) {
    console.error("Connected to Database failure");
    process.exit(1);
  }
}

module.exports = { connect };
