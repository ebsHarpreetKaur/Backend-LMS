const mongoose = require('mongoose');  //adding db

employeeSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    phone:Number,
    gender:String
})


module.exports = mongoose.model('Employee', employeeSchema); 