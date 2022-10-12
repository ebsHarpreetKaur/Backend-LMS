const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Attendance = require('../model/attendance');
const checkAuth = require('../middleware/check-auth');



// attendance CheckIn/CheckOut
router.post('/', (req, res, next) => {
    const attendance = new Attendance({
        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        Date: req.body.Date,
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
router.get('/emp_id', (req, res, next) => {
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


module.exports = router;  