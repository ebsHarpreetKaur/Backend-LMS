const mongoose = require('mongoose');  //adding db

userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    password:String,
    phone:Number,
    email:String, 
    role : {
        type : String,
        uppercase : false,
        required : true,
        lowercase: true,
        enum : ["admin", "employee", "hr"]
    }
   
})


module.exports = mongoose.model('user', userSchema); 