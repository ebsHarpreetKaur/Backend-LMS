const mongoose = require("mongoose");

attendanceSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    emp_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    CheckIn: String,
    CheckOut: String,
    Breaks: 
      {
        type: Array,
        ref: "Break"
      },
    
    Resume: String,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
