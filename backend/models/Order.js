const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    products: [
      {
        name: String,
        price: Number,
        image: String,
        admin: String,
      },
    ],

    total: Number,
    address: Object,

    status: { type: String, default: "Pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
