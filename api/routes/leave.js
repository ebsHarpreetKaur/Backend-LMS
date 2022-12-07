const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Leave = require("../model/leave");
const checkAuth = require("../middleware/check-auth");

/**
 * @swagger
 * components:
 *     schema:
 *         leave:
 *                type: object
 *                properties:
 *                    emp_id:
 *                        type: string
 *                    EmployeeName:
 *                        type: string
 *                    SupervisorName:
 *                        type: string
 *                    Department:
 *                        type: string
 *                    LeaveType:
 *                        type: string
 *                    LeaveDate:
 *                        type: string
 *                    ReturnDate:
 *                        type: string
 *                    TotalHoursRequested:
 *                        type: string
 *                    TotalDaysRequested:
 *                        type: string
 */

//=============================================== POST Leave =======================================================
/**
 * @swagger
 * /leave:
 *  post:
 *      summary: Apply new Leave
 *      description: Apply new Leave
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/leave'
 *      responses:
 *          200:
 *              description: Success! New Leave Applied
 */
// Apply Leave
router.post("/", (req, res, next) => {
  const leave = new Leave({
    _id: new mongoose.Types.ObjectId(),
    emp_id: req.body.emp_id,
    EmployeeName: req.body.EmployeeName,
    // SupervisorName: req.body.SupervisorName,
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
//=============================================== POST Leave =======================================================

//=============================================== GET All Today LeaveData =======================================================
/**
 * @swagger
 * /leave/TodayData:
 *  get:
 *      summary: Get today leave data
 *      description: Get today leave data
 *      responses:
 *          200:
 *              description: Success! today leave data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
// get api for employees on leave Today
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
//=============================================== GET All Today LeaveData =======================================================

//=============================================== GET All This Week LeaveData =======================================================
/**
 * @swagger
 * /leave/WeekData:
 *  get:
 *      summary: Get this week leave data
 *      description: Get this week leave data
 *      responses:
 *          200:
 *              description: Success! GET this week leave data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
  mydateString =
    mydate.getFullYear() +
    "-" +
    ("0" + (mydate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + mydate.getDate()).slice(-2);
  console.log("mydate string", mydateString);
  // get week data with - 7 from current date

  var query = {
    LeaveDate: {
      $gte: mydateString,
      $lte: MyDateString,
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
//=============================================== GET All This Week LeaveData =======================================================

//=============================================== GET All This Month LeaveData =======================================================
/**
 * @swagger
 * /leave/monthdata:
 *  get:
 *      summary: Get this month leave data
 *      description: Get this month leave data
 *      responses:
 *          200:
 *              description: Success! GET this month leave data
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
  firstdateString =
    firstdate.getFullYear() +
    "-" +
    ("0" + (firstdate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + "1");
  console.log("first Date of month", firstdateString);

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
//=============================================== GET All This Month LeaveData =======================================================

//=============================================== GET All Sick Leave by EmployeeID =======================================================
/**
 * @swagger
 * /leave/sick/{emp_id}:
 *  get:
 *      summary: Get all sick leave data by EmployeeID
 *      description: Get all sick leave data by EmployeeID
 *      parameters:
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description: Employee ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! GET sick leave data by EmployeeID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
//=============================================== GET All Sick Leave by EmployeeID =======================================================

//=============================================== GET All Priviliege Leave by EmployeeID =======================================================
/**
 * @swagger
 * /leave/priviliege/{emp_id}:
 *  get:
 *      summary: Get all priviliege leave data by EmployeeID
 *      description: Get all priviliege leave data by EmployeeID
 *      parameters:
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description: Employee ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! GET priviliege leave data by EmployeeID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
//=============================================== GET All Priviliege Leave by EmployeeID =======================================================

//=============================================== GET All Casual Leave by EmployeeID =======================================================
/**
 * @swagger
 * /leave/casual/{emp_id}:
 *  get:
 *      summary: Get all casual leave data by EmployeeID
 *      description: Get all casual leave data by EmployeeID
 *      parameters:
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description: Employee ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! GET casual leave data by EmployeeID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
//=============================================== GET All Casual Leave by EmployeeID =======================================================

//=========================================================== GET All Leaves ================================================================
/**
 * @swagger
 * /leave:
 *  get:
 *      summary: Get all Leaves
 *      description: Get all Leaves
 *      responses:
 *          200:
 *              description: Success! Get All Leaves
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Leave'
 */
// get all leaves
router.get("/", (req, res, next) => {
  Leave.find()
    .then((result) => {
      res.status(200).json({
        leaveData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//=========================================================== GET All Leaves ================================================================

//=========================================================== DELETE Leave by LeaveID================================================================
/**
 * @swagger
 * /leave/{_id}:
 *  delete:
 *      summary: Delete particular leave by leaveID
 *      description: Delete particular leave by leaveID
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  leaveID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! Leave Deleted
 */
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
//=========================================================== DELETE Leave by LeaveID================================================================

//=========================================================== EDIT Leave ================================================================
/**
 * @swagger
 * /leave/{_id}:
 *  put:
 *      summary: Edit Applied Leave
 *      description: Edit Applied Leave
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  leaveID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/leave'
 *      responses:
 *          200:
 *              description: Success! Leave Updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
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
//=========================================================== EDIT Leave ================================================================

//=========================================================== GET Leave by Employee ID================================================================
/**
 * @swagger
 * /leave/{emp_id}:
 *  get:
 *      summary: Get all leaves of particular employee by EmployeeID
 *      description: Get all leaves of particular employee by EmployeeID
 *      parameters:
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description:  Employee ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! GET Leave by EmployeeID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
// get Leave by employee id
router.get("/:emp_id", (req, res, next) => {
  console.log(req.params.emp_id);
  Leave.find({ emp_id: req.params.emp_id })
    .then((result) => {
      res.status(200).json({
        leaveByEmpID: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//=========================================================== GET Leave by Employee ID================================================================

//=========================================================== GET Leave by LeaveID================================================================
/**
 * @swagger
 * /leave/empLeave/{_id}:
 *  get:
 *      summary: Get particular leave by leaveID
 *      description: Get particular leave by leaveID
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description: leave ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! GET Leave by leaveID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/leave'
 */
// get Leave by id
router.get("/empLeave/:_id", (req, res, next) => {
  console.log(req.params._id);
  Leave.find({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        leave: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//=========================================================== GET Leave by LeaveID================================================================

module.exports = router;
