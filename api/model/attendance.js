const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require("../model/attendance");
const checkAuth = require("../middleware/check-auth");


attendanceSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name:
    {
      type: String,
      ref: "User",
    },

    CheckIn: String,
    CheckOut: String,
    Breaks:
    {
      type: Array,
      ref: "Break"
    },
    Resume: String,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
