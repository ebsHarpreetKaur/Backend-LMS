const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Leave = require('../model/leave');
const checkAuth = require('../middleware/check-auth');





// get api for employees leave on this week
router.get('/TodayData', (req, res, next) => {

    // if (req.Leave.ApprovalStatus == 'Approved') {
        var query = {

            LeaveDate: {
                $gte: ('2022-10-09')
                // $lte: new Date('2022-10-01').toISOString()
            },
            ReturnDate: {
                //     // $gte: new Date('2022-10-09').toISOString(),
                $lte: ('2022-10-09')
            },
        // }
    }
    Leave.find(query, function (err, data) {
        if (err) { return res.status(300).json("Error") }
        else {
            return res.status(200).json({ data: data })
        }
    })

})






// get api for employees leave on this week
router.get('/WeekData', (req, res, next) => {
    var query = {

        LeaveDate: {
            $gte: ('2022-10-09')
            // $lte: new Date('2022-10-07').toISOString()
        },
        ReturnDate: {
            // $gte: new Date('2022-10-09').toISOString(),
            $lte: ('2022-10-17')
        },
    }

    Leave.find(query, function (err, data) {
        if (err) { return res.status(300).json("Error") }
        else {
            return res.status(200).json({ data: data })
        }
    })
})


// router.get('/MonthData',(req,res,next) => {

//     function getDates (LeaveDate, ReturnDate) {
//         const dates = []
//         let currentDate = LeaveDate
//         const addDays = function (days) {
//         const date = (this.valueOf())
//         date.setDate(date.getDate() + days)
//         return date
//         }
//         while (currentDate <= ReturnDate) {
//         dates.push(currentDate)
//         currentDate = addDays.call(currentDate, 1)
//         }
//         return dates
//     }


//   const dates = getDates($gte= ('2022-10-01'), $lte= ('2022-10-30'))
//   dates.forEach(function (date) {
//     console.log(date)
//   })
// })



// get api for employees leave on this month
router.get('/MonthData', (req, res, next) => {

    var query = {

        LeaveDate: {
            $gte: ('2022-10-01'),
            $lte: ('2022-12-30')
        },


        // ReturnDate: {
        //     $gte: ('2022-10-01'),
        //     $lte: ('2022-10-30')
        // }
    }
    Leave.find(query, function (err, data) {
        if (err) { return res.status(300).json("Error") }
        else {
            return res.status(200).json({ data: data })
        }
    })
})



// router.get('/MonthData', (req, res, next) => {
//     var query = {
//         function(start, end) {
//             for (var arr = [], dt = ("2022-10-01"); dt <= ("2022-10-23"); dt.setDate(dt.getDate() + 1)) {
//                 arr.push((dt));
//             var daylist = getDaysArray(("2022-10-01"),("2022-10-30"));
//             daylist.map((v) => v.slice(0, 10)).join("")
//             }
//             return arr;


//         }
//     }

//     Leave.find(query, function (err, data) {
//         if (err) { return res.status(300).json("Error") }
//         else {
//             return res.status(200).json({ data: data })
//         }
//     })

// })




// get all leaves 
router.get('/', (req, res, next) => {
    Leave.find().populate('emp_id')
        .then(result => {
            res.status(200).json({
                leaveData: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
})





// Apply Leave
router.post('/', (req, res, next) => {
    const leave = new Leave({
        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        EmployeeName: req.body.EmployeeName,
        SupervisorName: req.body.SupervisorName,
        Department: req.body.Department,
        LeaveType: req.body.LeaveType,
        LeaveDate: req.body.LeaveDate,
        ReturnDate: req.body.ReturnDate,
        TotalHoursRequested: req.body.TotalHoursRequested,
        TotalDaysRequested: req.body.TotalDaysRequested,

    })
    leave.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newLeave: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});



// get Leave by id
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Leave.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                leave: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})




// delete Leave
router.delete('/:id', (req, res, next) => {
    Leave.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Leave Deleted",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})




// update leave
router.put('/:_id', (req, res, next) => {
    console.log(req.params._id);
    Leave.findOneAndUpdate({ _id: req.params._id }, {
        $set: {
            emp_id: req.body.emp_id,
            EmployeeName: req.body.EmployeeName,              //body parser
            SupervisorName: req.body.SupervisorName,
            Department: req.body.Department,
            LeaveType: req.body.LeaveType,
            ApprovalStatus: req.body.ApprovalStatus,
            LeaveDate: req.body.LeaveDate,
            ReturnDate: req.body.ReturnDate,
            TotalHoursRequested: req.body.TotalHoursRequested,
            TotalDaysRequested: req.body.TotalDaysRequested,

        }
    })
        .then(result => {
            res.status(200).json({
                updated_leave: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})





module.exports = router;             