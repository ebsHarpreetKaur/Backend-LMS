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




// Filter by date range
router.get("/Daterange", (req, res, next) => {
    // const date = new Date();
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let currentDate = `${year}-${month}-${day}`;
    // console.log(currentDate);

    var query = {
        CheckIn: {

            $gte: req.body.startDate,
            $lte: req.body.endDate,
            // $gte: new Date().toISOString(),
            // $lte: new Date().toISOString()
            // $gte: currentDate,
            // $lte: currentDate
        }

    };
    Attendance.find(query, function (err, data) {
        if (err) {
            return res.status(300).json("Error");
        } else {
            return res.status(200).json({ data: data });
        }
    });
    console.log(query)
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
router.get("/record", (req, res, next) => {
    // console.log(req.params._id);
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    console.log(currentDate);

    var query = {
        CheckIn: {

            $gte: currentDate,

        }

    };
    console.log("new Date ", query)

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
router.get("/", (req, res, next) => {
    Attendance.find()
        .then((result) => {
            res.status(200).json({
                attendanceRecord: result
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
