const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 3,
      max: 255
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255
    },
    password: {
      type: String,
      required: true,
      select: false,
      max: 1024,
      min: 6
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
