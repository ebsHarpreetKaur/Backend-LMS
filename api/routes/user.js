const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
<<<<<<< HEAD
const User = require('../model/user');
=======
const User = require('../model/user'); 
const {OAuth2Client} = require('google-auth-library'); 
const { response } = require('express');

const client = new OAuth2Client("782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com")
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
<<<<<<< HEAD
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                role: req.body.role
=======
                name:req.body.name,
                password:hash,                
                phone:req.body.phone,
                email:req.body.email,
                role:req.body.role
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})







<<<<<<< HEAD
router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
=======
router.post('/login',(req,res,next)=>{
    User.find({name:req.body.name})
    .exec()
    .then(user=>{
        if(user.length < 1)
        {
            return res.status(401).json({
                msg:'user not exist'
            })
        }
        console.log("going forward")
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            console.log("Checking user Password")
            if(!result)
            {
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa
                return res.status(401).json({
                    msg: 'user not exist'
                })
            }
<<<<<<< HEAD
            console.log("going forward")
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                console.log("Checking user Password")
                if (!result) {
                    return res.status(401).json({

                        msg: 'user password matching fail'

                    })

                }
=======
            
            if(result)
           
            {
                const token = jwt.sign({
                    name:user[0].name,
                    password:user[0].password,
                    phone:user[0].phone,
                    email:user[0].email,
                    role:user[0].role
                    
                },
                'this is dummy text',                       // SECRET KEY
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    name:user[0].name,
                    password:user[0].password,
                    phone:user[0].phone,
                    email:user[0].email,                   
                    role:user[0].role,
                    token:token
                })
            
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa

                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        password: user[0].password,
                        phone: user[0].phone,
                        email: user[0].email,
                        role: user[0].role

                    },
                        'this is dummy text',                       // SECRET KEY
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        password: user[0].password,
                        phone: user[0].phone,
                        email: user[0].email,
                        role: user[0].role,
                        token: token
                    })


                }
                console.log("user token generated successfully")
            })

        })
        .catch(err => {
            res.status(500).json({
                err: err
            })

        })

})



// Google Login API endpoint

router.post('/googlelogin',(req,res)=>{
    const{tokenId} = req.body;

<<<<<<< HEAD
// get employees by id
router.get('/:_id', (req, res, next) => {
    console.log(req.params._id);
    Employee.findById(req.params._id)
        .then(result => {
            res.status(200).json({
                employee: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
=======
    client.verifyIdToken({idToken: tokenId, audience: "782778790753-11hlt4rsr491dbmdaej4udve468rldgr.apps.googleusercontent.com"}).then(response =>{
        const {email_verified, name, email} = response.getPayload;
        if(email_verified) {
            User.findOne({email}).exec((err, user) =>{
                if(err) {
                    return res.status(500).json({
                        error:"Something went wrong..."
                    })
                } else {
                    if(user) {
                        const token = jwt.sign({
                            _id: user._id,
                            name:user[0].name,
                            password:user[0].password,
                            email:user[0].email,
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa

                            
                        },
                        'this is dummy text',                       // SECRET KEY
                        {
                            expiresIn:"24h"
                        }
                        );
                        res.status(200).json({
                            _id:user[0]._id,
                            name:user[0].name,
                            password:user[0].password,
                            email:user[0].email,                   
                            token:token
                        })

                    } else {
                        let password = email+name;
                        let newUser = new User({name, email, password});
                        newUser.save((err, data) => {
                            if (err){
                                return res.status(500).json({
                                    error:"Check Your Credentials..."
                                })
                            }
                            const token = jwt.sign({
                                _id: data._id,
                                name:data[0].name,
                                password:data[0].password,
                                email:data[0].email,
    
                                
                            },
                            'this is dummy text',                       // SECRET KEY
                            {
                                expiresIn:"24h"
                            }
                            );
                            res.status(200).json({
                                _id: data._id,
                                name:data[0].name,
                                email:data[0].email,                   
                                token:token
                            })
                        })
                        
                    }

<<<<<<< HEAD




// delete emeployees
router.delete('/:_id', (req, res, next) => {
    Employee.remove({ _id: req.params._id })
        .then(result => {
            res.status(200).json({
                message: "Employee Deleted",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})




// update all data of an employee
router.put('/:_id', (req, res, next) => {
    console.log(req.params._id);
    Employee.findOneAndUpdate({ _id: req.params._id }, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            role: req.body.role
=======
                }
            })
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa
        }
        // console.log(response.payload);
    })
<<<<<<< HEAD
        .then(result => {
            res.status(200).json({
                updated_employee: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
=======

>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa
})






<<<<<<< HEAD


router.post('/mail', (req, res) => {
=======
router.post('/mail',(req,res)=>{
>>>>>>> 10db4bef14b1e4b644df87234fc59c3a48b5f8aa
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebsharpreetkaur@gmail.com',
            pass: 'harpreet@1999'
        }
    })

    let info = transporter.sendMail({
        from: 'ebsharpreetkaur@gmail.com',
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text

    })
    if (info) {
        res.send('Mail sent Successfully.')

    } else {
        res.send('Error in sending mail.')
    }



})


module.exports = router;