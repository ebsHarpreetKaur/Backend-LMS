const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const GoogleUser = require('../model/google'); 


router.post('/googleSignup', async(req,res)=>{
 

            const google_user = new GoogleUser({
                google_Id:req.body.google_Id,
                name:req.body.name,
                email:req.body.email,
            });
        
            const val = await google_user.save();
            res.json(val);
   
 
})