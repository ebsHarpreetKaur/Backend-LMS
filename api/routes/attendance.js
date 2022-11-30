const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Attendance = require("../model/attendance");
const checkAuth = require("../middleware/check-auth");
// const { query } = require("express");

// attendance CheckIn/CheckOut
router.post("/:emp_id", (req, res, next) => {
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  Attendance.find({ emp_id: req.params.emp_id, TodayDate: MyDateString }).then(
    (result) => {
      if (result.length >= 1) {
        console.log("todayDate result during attendance POST", result);
        res.status(404).json({
          msg: "You have already checked-in",
        });
      } else {
        const attendance = new Attendance({
          _id: new mongoose.Types.ObjectId(),
          emp_id: req.body.emp_id,
          name: req.body.name,
          CheckIn: req.body.CheckIn,
          CheckOut: req.body.CheckOut,
          Breaks: req.body.Breaks,
          TodayDate: req.body.TodayDate,
        });
        attendance
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              newAttendance: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    }
  );
});

router.get("/", (req, res, next) => {
  Attendance.find()
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

// delete Leave
router.delete("/:id", (req, res, next) => {
  Attendance.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Attendance Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Get all Attendance of employee
router.get("/employee/:emp_id", (req, res, next) => {
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  console.log(req.params.emp_id);
  Attendance.find({ emp_id: req.params.emp_id, TodayDate: MyDateString })
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

// Get Cuurent Date Attendance
router.get("/record/:_id", (req, res, next) => {
  console.log(req.params._id);
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  var query = {
    _id: req.params._id,
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
  const { TodayDate } = req.body;
  console.log("Check data here ", req.body?.TodayDate);
  Start = req.body?.TodayDate?.Start;
  End = req.body?.TodayDate?.End;

  // Start = req.body.TodayDate[0]
  // End = req.body.TodayDate[1]
  console.log("Start", Start);
  console.log("End", End);

  if (req.body.TodayDate) {
    // console.log("TodayDate", req.body.TodayDate)
    Attendance.find({ TodayDate: { $gte: Start, $lte: End } })
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
router.put("/addon/:_id", (req, res, next) => {
  console.log(req.params._id);
  Attendance.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut,
        Breaks: req.body.Breaks,
        eodoftheday: req.body.eodoftheday,
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
