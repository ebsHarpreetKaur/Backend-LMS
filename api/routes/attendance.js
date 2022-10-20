const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Attendance = require('../model/attendance');
const checkAuth = require('../middleware/check-auth');



// attendance CheckIn/CheckOut
router.post('/:emp_id', (req, res, next) => {
    const attendance = new Attendance({
        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        CheckIn: req.body.CheckIn,
        CheckOut: req.body.CheckOut,
        Break: req.body.Break,
        Resume: req.body.Resume

    })
    attendance.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                attendanceRecord: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});





// Attendance Record Particular Employee
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






//All Employees Attendance Record
router.get('/', (req, res, next) => {
    Attendance.find().populate('emp_id')
        .then(result => {
            res.status(200).json({
                attendanceRecord: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})




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
                Break: req.body.Break,
                Resume: req.body.Resume,

            },
        }
    )
        .then((result) => {
            res.status(200).json({
                updatedAttendance: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;  