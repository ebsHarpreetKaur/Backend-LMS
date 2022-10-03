const mongoose = require('mongoose');




leaveSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,

    emp_id:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Employee'
    }],
    EmployeeName:String,
    SupervisorName : {
        type : String,
        required : [true, 'Please enter Supervisor name']
    },

    Department : {
        type : String,
        required : [true, 'Please Enter Department'],
    },

    LeaveType : {
        type : String,
        required : true,
        enum : ["Priviliege", "Sick", "Holiday", "Casual"]
    },

    LeaveDate : { type: Date, default: Date.now },
    ReturnDate : { type: Date, default: Date.now },
    TotalHoursRequested : Number,
    TotalDaysRequested : Number,



})

module.exports = mongoose.model('Leave', leaveSchema);