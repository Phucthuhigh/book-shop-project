const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String },
    author_id: { type: ObjectId },
    image: {
      type: String,
      default: "/img/white-image.png",
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

Product.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true });

module.exports = mongoose.model("Product", Product);
