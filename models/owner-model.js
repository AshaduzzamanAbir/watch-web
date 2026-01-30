const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: Number,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
