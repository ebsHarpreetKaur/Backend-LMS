const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require("../model/attendance");
const checkAuth = require("../middleware/check-auth");
// const { query } = require("express");

// attendance CheckIn/CheckOut
router.post("/:emp_id", (req, res, next) => {
  const attendance = new Attendance({
    _id: new mongoose.Types.ObjectId(),
    emp_id: req.body.emp_id,
    name: req.body.name,
    CheckIn: req.body.CheckIn,
    CheckOut: req.body.CheckOut,
    Breaks: req.body.Breaks,
    TodayDate: req.body.TodayDate
  });
  attendance.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        newAttendance: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});


// Get by employee id
router.get("/employee/:emp_id", (req, res, next) => {
  console.log(req.params.emp_id);
  Attendance.find({ emp_id: req.params.emp_id })
    .then((result) => {
      res.status(200).json({
        attendanceDataByEmpID: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Get By ID
router.get("/record/:emp_id", (req, res, next) => {
  console.log(req.params._id);
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-'
    + ('0' + MyDate.getDate()).slice(-2)

  var query = {
    emp_id: req.params.emp_id,
    TodayDate: {
      $gte: MyDateString,
    },
  };
  console.log("new Date ", query);

  Attendance.find(query)
    .then((result) => {
      res.status(200).json({
        attendanceDataByID: result,
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
router.post("/", (req, res, next) => {

  if (req.body.TodayDate) {
    console.log("TodayDate", req.body.TodayDate)
    Attendance.find({ TodayDate: req.body.TodayDate })
      .then((result) => {
        res.status(200).json({
          AttendanceDataByDateRange: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });

  } else if (req.body.name) {
    console.log(req.body.name);
    Attendance.find({ name: req.body.name })
      .then((result) => {
        res.status(200).json({
          attendanceDataByName: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
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
  }

});

// update employee attendance
router.put("/:_id", (req, res, next) => {
  console.log(req.params._id);
  Attendance.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {

        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut,
        Breaks: req.body.Breaks,

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
