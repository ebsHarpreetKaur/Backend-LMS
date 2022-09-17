const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup',(req,res,next)=>{
    // bcrypt.hash(req.body.password,10,(err, hash)=>{
    //     if(err)
    //     {
    //         return res.status(500).json({
    //             error:err
    //         })
    //     }
    //     else
    //     {
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
            
})
//     })

// })






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
    
    if(req.body.password!=user[0].password)
    {
        return res.status(500).json({
            msg:"Passoword doesnot match"
        })
    }

    else { 
    
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
    console.log("Token generated successfully")
    
    }
    
   
    
        // })

    // })
    // else
    // {
    //     return res.status(500).json({
    //         msg:"Error"
    //     })
    // }
  
    
    
   })
})

module.exports = router;