const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Leave = require("../model/leave");
const checkAuth = require("../middleware/check-auth");

// get api for employees leave Today
router.get("/TodayData", (req, res, next) => {
  // date format "2022-10-02" with zero
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  // if (req.Leave.ApprovalStatus == 'Approved') {
  var query = {
    LeaveDate: {
      $gte: MyDateString,
      // $lte: new Date('2022-10-01').toISOString()
    },
    // ReturnDate: {
    //     //     // $gte: new Date('2022-10-09').toISOString(),
    //     $lte: currentDate
    // },
    // }
  };
  console.log(query);
  Leave.find(query, function (err, data) {
    if (err) {
      return res.status(300).json("Error");
    } else {
      return res.status(200).json({ data: data });
    }
  });
});

// get api for employees leave on this week
router.get("/WeekData", (req, res, next) => {
  // current date with 0
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);
  // current date with 0

  // get week data with - 7 from current date
  var mydate = new Date();
  var mydateString;
  mydate.setDate(mydate.getDate() - 7);
  mydateString = mydate.getFullYear() +
    "-" +
    ("0" + (mydate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + mydate.getDate()).slice(-2);
  console.log("mydate string", mydateString)
  // get week data with - 7 from current date



  var query = {
    LeaveDate: {
      $gte: mydateString,
      $lte: MyDateString
    },
    // ReturnDate: {
    //   // $gte: new Date('2022-10-09').toISOString(),
    //   $lte: "2022-11-07",
    // },
  };

  Leave.find(query, function (err, data) {
    if (err) {
      return res.status(300).json("Error");
    } else {
      return res.status(200).json({ data: data });
    }
  });
});



// get api for employees leave on this month
router.get("/monthdata", (req, res, next) => {
  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);


  // get First date of the Month
  var firstdate = new Date();
  var firstdateString;
  firstdateString = firstdate.getFullYear() +
    "-" +
    ("0" + (firstdate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + "1");
  console.log("first Date of month", firstdateString)


  var query = {
    LeaveDate: {
      $gte: firstdateString,
      $lte: MyDateString,
    },
    // ReturnDate: {
    //     // $gte: new Date('2022-10-09').toISOString(),
    //     $lte: ('2022-10-25')
    // },
  };
  console.log(query);

  Leave.find(query)
    .then((result) => {
      res.status(200).json({
        MonthLeaveData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

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

// get particular employee Sick leave
router.get("/sick/:emp_id", (req, res, next) => {
  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Sick" })
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0)
        message = "No employee found!";
      else message = "Employee Leave data successfully retrieved";
      res.status(200).send(data);
      console.log(data.length);
    })
    .catch((err) => {
      res.status(400).send("Some error occured");
    });
});

// get particular employee Priviliege leave
router.get("/priviliege/:emp_id", (req, res, next) => {
  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Priviliege" })
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0)
        message = "No employee found!";
      else message = "Employee Leave data successfully retrieved";
      res.status(200).send(data);
      console.log("Total Sick Leave", data.length);
    })
    .catch((err) => {
      res.status(400).send("Some error occured");
    });
});

// get particular employee Casual leave
router.get("/casual/:emp_id", (req, res, next) => {
  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Casual" })
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0)
        message = "No employee found!";
      else message = "Employee Leave data successfully retrieved";
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send("Some error occured");
    });
});

// get particular employee Sick leave 
router.get('/sick/:emp_id', (req, res, next) => {

  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Sick" })
    .then(data => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No employee found!";
      else message = 'Employee Leave data successfully retrieved';
      res.status(200).send(data)
      console.log(data.length)
    }).catch(err => {
      res.status(400).send('Some error occured')
    })
})






// get particular employee Priviliege leave 
router.get('/priviliege/:emp_id', (req, res, next) => {

  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Priviliege" })
    .then(data => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No employee found!";
      else message = 'Employee Leave data successfully retrieved';
      res.status(200).send(data)
      console.log("Total Sick Leave", data.length)

    }).catch(err => {
      res.status(400).send('Some error occured')
    })
})






// get particular employee Casual leave 
router.get('/casual/:emp_id', (req, res, next) => {

  Leave.find({ emp_id: req.params.emp_id, LeaveType: "Casual" })
    .then(data => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No employee found!";
      else message = 'Employee Leave data successfully retrieved';
      res.status(200).send(data)

    }).catch(err => {
      res.status(400).send('Some error occured')
    })
})






// get all leaves 
router.get('/', (req, res, next) => {
  Leave.find()
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
router.post("/", (req, res, next) => {
  const leave = new Leave({
    _id: new mongoose.Types.ObjectId(),
    emp_id: req.body.emp_id,
    EmployeeName: req.body.EmployeeName,
    SupervisorName: req.body.SupervisorName,
    Department: req.body.Department,
    LeaveType: req.body.LeaveType,
    LeaveDate: req.body.LeaveDate,
    ReturnDate: req.body.ReturnDate,
    TotalHoursRequested: req.body.TotalHoursRequested,
    TotalDaysRequested: req.body.TotalDaysRequested,
  });
  leave
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newLeave: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


// get Leave by id
// router.get("/:_id", (req, res, next) => {
//   console.log(req.params._id);
//   Leave.findById(req.params.id)
//     .then((result) => {
//       res.status(200).json({
//         leave: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// delete Leave
router.delete("/:id", (req, res, next) => {
  Leave.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Leave Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// update leave
router.put("/:_id", (req, res, next) => {
  console.log(req.params._id);
  Leave.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        _id: req.body._id,
        EmployeeName: req.body.EmployeeName, //body parser
        SupervisorName: req.body.SupervisorName,
        Department: req.body.Department,
        LeaveType: req.body.LeaveType,
        ApprovalStatus: req.body.ApprovalStatus,
        LeaveDate: req.body.LeaveDate,
        ReturnDate: req.body.ReturnDate,
        TotalHoursRequested: req.body.TotalHoursRequested,
        TotalDaysRequested: req.body.TotalDaysRequested,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_leave: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});


// get Leave by employee id
router.get('/:emp_id', (req, res, next) => {
  console.log(req.params.emp_id);
  Leave.find({ emp_id: req.params.emp_id })
    .then(result => {
      res.status(200).json({
        leaveByEmpID: result

      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})


// get Leave by id
router.get('/empLeave/:_id', (req, res, next) => {
  console.log(req.params._id);
  Leave.find({ _id: req.params._id })
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
      _id: req.body._id,
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
