const mongoose = require("mongoose"); //adding db

userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: String,
  name: String,
  password: String,
  contact: Number,
  email: String,
  gender: String,
  imageUrl: String,
  role: {
    type: String,
    uppercase: false,
    lowercase: true,
    enum: ["admin", "employee", "hr"],
  },
});

module.exports = mongoose.model("user", userSchema);
