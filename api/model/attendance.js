const mongoose = require('mongoose');

attendanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emp_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    }],
    Date: Date,
    CheckIn: Date,
    CheckOut: Date,
    Break: Date,
    Resume: Date

},{ timestamps: true })


module.exports = mongoose.model('Attendance', attendanceSchema); 