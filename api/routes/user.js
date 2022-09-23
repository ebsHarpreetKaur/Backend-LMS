const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')


router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err, hash)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else
        {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username:req.body.username,
                password:req.body.password,                
                phone:req.body.phone,
                email:req.body.email,
                userType:req.body.userType
            })
        
            user.save()
            .then(result=>{
                res.status(200).json({
                    new_user:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }  
    })
})







router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
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
            console.log("Checking Password")
            if(!result)
            {
                return res.status(401).json({
                  
                    msg:'password matching fail'
                   
                })
                
            }
            
            if(result)
           
            {
                const token = jwt.sign({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone
                },
                'this is dummy text',                       // SECRET KEY
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    username:user[0].username,
                    userType:user[0].userType,
                    email:user[0].email,
                    phone:user[0].phone,
                    token:token
                })
                

            }
            console.log("token generated successfully")
        })

    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })

    })
    
})







router.post('/mail',(req,res)=>{
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