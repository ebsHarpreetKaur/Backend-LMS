const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Employee = require("../model/employee"); //to craete collection in mongodb
const checkAuth = require("../middleware/check-auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// get all employees
router.get("/", (req, res, next) => {
  Employee.find()
    .then((result) => {
      res.status(200).json({
        employeeData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// post employees
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name, //body parser
        password: hash,
        email: req.body.email,
        contact: req.body.contact,
        gender: req.body.gender,
        role: req.body.role,
      });
      employee
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            newEmployee: result,
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
});

// // employee login
router.post("/login", (req, res, next) => {
  Employee.find({ name: req.body.name })
    .exec()
    .then((employee) => {
      if (employee.length < 1) {
        return res.status(401).json({
          msg: "employee not exist",
        });
      }
      console.log("going forward");
      bcrypt.compare(req.body.password, employee[0].password, (err, result) => {
        console.log("Checking employee Password");
        if (!result) {
          return res.status(401).json({
            msg: "employee password matching fail",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              name: employee[0].name,
              password: employee[0].password,
              contact: employee[0].contact,
              email: employee[0].email,
              role: employee[0].role,
            },
            "this is dummy text", // SECRET KEY
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            name: employee[0].name,
            password: employee[0].password,
            contact: employee[0].contact,
            email: employee[0].email,
            role: employee[0].role,
            token: token,
          });
        }
        console.log("employee token generated successfully");
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

// get employees by id
router.get("/:_id", (req, res, next) => {
  console.log(req.params._id);
  Employee.findById(req.params._id)
    .then((result) => {
      res.status(200).json({
        employee: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// delete emeployees
router.delete("/:_id", (req, res, next) => {
  Employee.remove({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        message: "Employee Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// update all data of an employee
router.put("/:_id", (req, res, next) => {
  console.log(req.params._id);
  Employee.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        gender: req.body.gender,
        role: req.body.role,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updated_employee: result,
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
