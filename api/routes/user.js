const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");

// const client = new OAuth2Client(
//   "782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com"
// );

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: hash,
        contact: req.body.contact,
        email: req.body.email,
        gender: req.body.gender,
        role: req.body.role,
        // joiningDate:req.body.joiningDate,
        // fatherName:req.body.fatherName,
        // motherName:req.body.motherName,
        // bloodGroup:req.body.bloodGroup,
        // contactNumber:req.body.contactNumber,
        // permanentAddress:req.body.permanentAddress,
        // adharNumber:req.body.adharNumber,
        // panNumber:req.body.panNumber,
        // salary:req.body.salary,
        // appraisal:req.body.appraisal,
        LinkedinProfileLink: req.body.LinkedinProfileLink
      });

      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

// update all data of an user
router.put("/:_id", (req, res, next) => {
  console.log(req.params._id);
  // console.log(req.body.name, "name");
  User.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        gender: req.body.gender,
        role: req.body.role,
        joiningDate: req.body.joiningDate,
        fatherName: req.body.fatherName,
        motherName: req.body.motherName,
        bloodGroup: req.body.bloodGroup,
        contactNumber: req.body.contactNumber,
        permanentAddress: req.body.permanentAddress,
        adharNumber: req.body.adharNumber,
        panNumber: req.body.panNumber,
        salary: req.body.salary,
        appraisal: req.body.appraisal,
        LinkedinProfileLink: req.body.LinkedinProfileLink

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

// get user by id
router.get("/:_id", (req, res, next) => {
  console.log(req.params._id);
  User.findById(req.params._id)
    .then((result) => {
      res.status(200).json({
        myData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// get all users
router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      res.status(200).json({
        userData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  User.find({ name: req.body.name })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "user not exist",
        });
      }
      console.log("going forward");
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log("Checking user Password");
        if (!result) {
          return res.status(401).json({
            msg: "user password matching fail",
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              _id: user[0]._id,
              name: user[0].name,
              password: user[0].password,
              phone: user[0].phone,
              email: user[0].email,
              gender: req.body.gender,
              role: user[0].role,
            },
            "this is dummy text", // SECRET KEY
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            _id: user[0]._id,
            name: user[0].name,
            password: user[0].password,
            phone: user[0].phone,
            email: user[0].email,
            gender: req.body.gender,
            role: user[0].role,
            token: token,
          });
        }
        console.log("user token generated successfully");
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

router.post("/googlelogin", (req, res) => {
  const { profileObj } = req.body;
  // let response = { "error": "Something is wrong", "code": "400" }

  console.log(req.body?.profileObj);
  const email = req.body?.profileObj?.email;
  const name = req.body?.profileObj?.name;
  const givenName = req.body?.profileObj?.givenName;
  const familyName = req.body?.profileObj?.familyName;
  const googleId = req.body?.profileObj?.googleId;
  const imageUrl = req.body?.profileObj?.imageUrl;

  if (email) {
    User.findOne({ email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({
          error: "Something went wrong...",
        });
      } else {
        if (user) {
          const token = jwt.sign(
            {
              name: user[0].profileObj?.name,
              email: user[0].profileObj?.email,
            },
            "this is dummy text", // SECRET KEY
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            name: user[0].profileObj?.name,
            email: user[0].profileObj?.email,
            token: token,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body?.profileObj?.name,
            email: req.body?.profileObj?.email,
            googleId: req.body?.profileObj?.googleId,
            imageUrl: req.body?.profileObj?.imageUrl,
          });

          user
            .save()
            .then((result) => {
              res.status(200).json({
                new_user: result,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        }
      }
    });
    // response = { "success": "User Already Exist", "code": 200 }
  }
});

// delete user
router.delete("/empdel/:_id", (req, res, next) => {
  User.remove({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        message: "User/Employee Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Send Mail
router.post("/mail", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ebsharpreetkaur@gmail.com",
      pass: "harpreet@1999",
    },
  });

  let info = transporter.sendMail({
    from: "ebsharpreetkaur@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  });
  if (info) {
    res.send("Mail sent Successfully.");
  } else {
    res.send("Error in sending mail.");
  }
});

module.exports = router;
