const mongoose = require("mongoose");

attendanceSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: [
      {
        type: String,
        ref: "User",
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
