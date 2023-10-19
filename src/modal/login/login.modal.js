const mongoose = require("mongoose");

const loginSchema = new mongoose.loginSchema({
  mail_or_phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Login", loginSchema);
