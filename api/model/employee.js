const mongoose = require("mongoose"); //adding db

employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  contact: Number,
  gender: String,
  role: {
    type: String,
    uppercase: false,
    required: true,
    lowercase: true,
    enum: ["admin", "employee", "hr"],
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
