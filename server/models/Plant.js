const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categories: [{ type: String }], // multiple categories
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Plant", plantSchema);
