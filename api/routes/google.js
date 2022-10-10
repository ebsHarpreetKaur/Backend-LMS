const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const GoogleUser = require('../model/google');


router.post('/googleSignup', (req, res) => {


    const google_user = new GoogleUser({
        google_Id: req.body.google_Id,
        name: req.body.name,
        email: req.body.email,
    });
    console.log(req, "req")
    console.log(req.body, "body")
    console.log(req.body.google_Id, "googleId")

    const val = google_user.save();
    res.json(val);


})
module.exports = router;


