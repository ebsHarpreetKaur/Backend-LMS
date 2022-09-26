const mongoose = require('mongoose');



leaveSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    EmployeeName : {
        type : String,
        required : [true, 'Please Entern Employee name'],
      


    },
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
        lowercase : false,
        enum : ["Priviliege", "Sick", "Holiday", "Casual"]
    },
    LeaveDate : Date,
    ReturnDate : Date,
    TotalHoursRequested : Number,
    TotalDaysRequested : Number
})


module.exports = mongoose.model('Leave', leaveSchema);