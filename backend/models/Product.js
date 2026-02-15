const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
