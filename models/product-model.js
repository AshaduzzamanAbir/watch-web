const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  image: Buffer,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  description: String,
  category: String,
  bgcolor: String,
  panalcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
