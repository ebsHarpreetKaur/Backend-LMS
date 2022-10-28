const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require("../model/attendance");
const checkAuth = require("../middleware/check-auth");
const { query } = require("express");

// attendance CheckIn/CheckOut
router.post("/:emp_id", (req, res, next) => {
  const attendance = new Attendance({
    _id: new mongoose.Types.ObjectId(),
    emp_id: req.body.emp_id,
    CheckIn: req.body.CheckIn,
    CheckOut: req.body.CheckOut,
    Breaks: req.body.Breaks,
    Resume: req.body.Resume,
  });
  attendance
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        attendanceRecord: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Filter by Specific Month
router.get("/Month", (req, res, next) => {
  var query = {
    CheckIn: {
      // $lte: ("2022-10-07"),
      // $gte: ("2022-10-09"),
      $gte: new Date("2022-10-01").toISOString(),
      $lte: new Date("2022-10-30").toISOString(),
    },
  };

  Attendance.find(query, function (err, data) {
    if (err) {
      return res.status(300).json("Error");
    } else {
      return res.status(200).json({ data: data });
    }
  });
});

// Filter by date range
router.get("/Daterange", (req, res, next) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);

  var query = {
    // $lte: ("2022-10-07"),
    // $gte: ("2022-10-09"),
    // $gte: new Date('2022-10-01').toISOString(),
    // $lte: new Date('2022-10-30').toISOString()
    $gte: currentDate,
    $lte: currentDate,
  };

  Attendance.find(query, function (err, data) {
    if (err) {
      return res.status(300).json("Error");
    } else {
      return res.status(200).json({ data: data });
    }
  });
  console.log(query);
});
// const date = new Date();
// let day = date.getDate();
// let month = date.getMonth() + 1;
// let year = date.getFullYear();
// let currentDate = `${day}-${month}-${year}`;
// console.log(currentDate);

// Filter per employee
router.get("/:emp_id", (req, res, next) => {
  console.log(req.params.emp_id);
  Attendance.find({ emp_id: req.params.emp_id })
    .then((result) => {
      res.status(200).json({
        attendanceData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Employee Attendance Report
router.get("/", (req, res, next) => {
  Attendance.find()
    .then((result) => {
      res.status(200).json({
        attendanceRecord: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// update employee attendance
router.put("/:emp_id", (req, res, next) => {
  console.log(req.params.emp_id);
  console.log("name", req.body.name);
  Attendance.findOneAndUpdate(
    { emp_id: req.params.emp_id },
    {
      $set: {
        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut,
        Breaks: req.body.Breaks,
        Resume: req.body.Resume,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updatedAttendance: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
