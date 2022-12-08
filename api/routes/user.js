const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");
const multer = require("multer");
/**
 * @swagger
 * components:
 *     schema:
 *         user:
 *                type: object
 *                properties:
 *                    name:
 *                        type: string
 *                    password:
 *                        type: string
 *                    contact:
 *                        type: string
 *                    email:
 *                        type: string
 *                    gender:
 *                        type: string
 *                    role:
 *                        type: string
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./api/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else if (file.mimetype === "image/jpeg") {
    cb(null, true);
  } else if (file.mimetype === "image/jpg") {
    cb(null, true);
  } else if (file.minetype === "application/msword") {
    cb(null, true);
  } else if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else if (file.mimetype === "application/msword") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //     fileSize: 1024  1024  5      // 5 MB
  // },
  fileFilter: fileFilter,
});

//=============================================== user signup ====================================================
/**
 * @swagger
 * /user/signup:
 *  post:
 *      summary: Add new user
 *      description: Add new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/user'
 *      responses:
 *          200:
 *              description: Success! new user added
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/user'
 */
router.post("/signup", (req, res, next) => {
  // bcrypt.hash(req.body.password, 10, (err, hash) => {
  //   if (err) {
  //     return res.status(500).json({
  //       error: err,
  //     });
  //   } else {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    password: req.body.password,
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
    linkedinprofilelink: req.body.linkedinprofilelink,
    profilepicture: req.body.profilepicture,
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
  //   }
  // });
});
//=============================================== user signup ====================================================

//=============================================== user update ====================================================
/**
 * @swagger
 * /user/{_id}:
 *  put:
 *      summary: Update user
 *      description: Update user
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  userID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/user'
 *      responses:
 *          200:
 *              description: Success! user Updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/user'
 */
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
        linkedinprofilelink: req.body.linkedinprofilelink,
        profilepicture: req.body.profilepicture,
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
//=============================================== user update ====================================================

//=============================================== get particular user ====================================================
/**
 * @swagger
 * /user/{_id}:
 *  get:
 *      summary: Get particular user by userID
 *      description: Get particular user by userID
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  userID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! Get user
 */
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
//=============================================== get particular user ====================================================

//=============================================== get all users ====================================================
/**
 * @swagger
 * /user:
 *  get:
 *      summary: Get all users
 *      description: Get all users
 *      responses:
 *          200:
 *              description: Success! Get all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/user'
 */
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
//=============================================== get all users ====================================================

//=============================================== user login ====================================================
/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: User login
 *      description: User login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/user'
 *      responses:
 *          200:
 *              description: Success! login
 */
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
      if (req.body.password !== user[0].password) {
        console.log("req.body.password", req.body.password);
        console.log("user[0].password", user[0].password);

        return res.status(401).json({
          msg: "user password matching fail",
        });
      } else {
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
        console.log("Success Password Matching");
      }
      // bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      //   console.log("Checking user Password");
      //   if (!result) {
      //     return res.status(401).json({
      //       msg: "user password matching fail",
      //     });
      //   }
      //   console.log("result", result)

      //   if (result) {
      //     const token = jwt.sign(
      //       {
      //         _id: user[0]._id,
      //         name: user[0].name,
      //         password: user[0].password,
      //         phone: user[0].phone,
      //         email: user[0].email,
      //         gender: req.body.gender,
      //         role: user[0].role,
      //       },
      //       "this is dummy text", // SECRET KEY
      //       {
      //         expiresIn: "24h",
      //       }
      //     );
      //     res.status(200).json({
      //       _id: user[0]._id,
      //       name: user[0].name,
      //       password: user[0].password,
      //       phone: user[0].phone,
      //       email: user[0].email,
      //       gender: req.body.gender,
      //       role: user[0].role,
      //       token: token,
      //     });
      //   }
      //   console.log("user token generated successfully");
      // });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});
//=============================================== user login ====================================================

//=============================================== user google-login ====================================================
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
//=============================================== user google-login ====================================================

//=============================================== delete user ====================================================
/**
 * @swagger
 * /user/empdel/{_id}:
 *  delete:
 *      summary: Delete particular user by userID
 *      description: Delete particular user by userID
 *      parameters:
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  userID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Success! user deleted
 */
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
//=============================================== delete user ====================================================

//=============================================== send mail ====================================================
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
//=============================================== send mail ====================================================

module.exports = router;
