const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require("../model/attendance");
const checkAuth = require("../middleware/check-auth");

attendanceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    ref: "User",
  },
  emp_id: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
  }],
  CheckIn: String,
  CheckOut: String,
  Breaks: Array,
  Resume: String,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
