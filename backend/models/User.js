const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: "http://localhost:5173/profile.png",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
