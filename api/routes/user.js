const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const { OAuth2Client } = require("google-auth-library");


const client = new OAuth2Client(
  "782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com"
);




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
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role,
      });

      user.save()
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



 router.post("/googlelogin", (req, res, next) => {

    console.log(req?.body , "req")
 })



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
              name: user[0].name,
              password: user[0].password,
              phone: user[0].phone,
              email: user[0].email,
              role: user[0].role,
            },
            "this is dummy text", // SECRET KEY
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            name: user[0].name,
            password: user[0].password,
            phone: user[0].phone,
            email: user[0].email,
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



// Google Login API endpoint
/*
router.post("/googlelogin", (req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email } = response.getPayload;
      console.log(response.payload);
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(500).json({
              error: "Something went wrong...",
            });
          } else {
            if (user) {
              const token = jwt.sign(
                {
                  name: user[0].name,
                  password: user[0].password,
                  phone: user[0].phone,
                  email: user[0].email,
                  role: user[0].role,
                },
                "this is dummy text", // SECRET KEY
                {
                  expiresIn: "24h",
                }
              );
              res.status(200).json({
                name: user[0].name,
                password: user[0].password,
                phone: user[0].phone,
                email: user[0].email,
                role: user[0].role,
                token: token,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                role: req.body.role,
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
      }
    });
});
*/

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
