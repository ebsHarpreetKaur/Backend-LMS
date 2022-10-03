const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const User = require('../model/user'); 


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
                password:hash,                
                phone:req.body.phone,
                email:req.body.email,
                role:req.body.role
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
            console.log("Checking user Password")
            if(!result)
            {
                return res.status(401).json({
                  
                    msg:'user password matching fail'
                   
                })
                
            }
            
            if(result)
           
            {
                const token = jwt.sign({
                    username:user[0].username,
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
                    username:user[0].username,
                    password:user[0].password,
                    phone:user[0].phone,
                    email:user[0].email,                   
                    role:user[0].role,
                    token:token
                })
            

            }
            console.log("user token generated successfully")
        })

    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })

    })
    
})





// get employees by id
router.get('/:_id',(req,res,next)=>{
    console.log(req.params._id);
    Employee.findById(req.params._id)
    .then(result=>{
        res.status(200).json({
            employee:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})






// delete emeployees
router.delete('/:_id',(req,res,next)=>{
    Employee.remove({_id:req.params._id})
    .then(result=>{
        res.status(200).json({
            message:"Employee Deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})




// update all data of an employee
router.put('/:_id',(req,res,next)=>{
    console.log(req.params._id);
    Employee.findOneAndUpdate({_id:req.params._id},{
        $set:{     
        name:req.body.name,            
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        role:req.body.role
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_employee:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
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