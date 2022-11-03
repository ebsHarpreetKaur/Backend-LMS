const mongoose = require('mongoose');




leaveSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    emp_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    EmployeeName: String,
    SupervisorName: {
        type: String,
        required: true
    },

    Department: {
        type: String,
        required: true
    },

    LeaveType: {
        type: String,
        required: true,
        enum: ["Priviliege", "Sick", "Holiday", "Casual", "ShortLeave"]
    },
    LeaveDate: String,
    ReturnDate: String,
    TotalHoursRequested: String,
    TotalDaysRequested: Number,
    ApprovalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },



})

module.exports = mongoose.model('Leave', leaveSchema);