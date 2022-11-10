const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// mongoose.connect(
//   "mongodb+srv://harpreet:123@cluster.2ksky9v.mongodb.net/?retryWrites=true&w=majority"
// );


// const userRoute = require('./api/routes/user');
// const leaveRoute = require('./api/routes/leave');
// const documentRoute = require('./api/routes/document');
// const attendanceRoute = require('./api/routes/attendance');
// const holidayRoute = require('./api/routes/holidays');
mongoose.connect('mongodb+srv://harpreet:123@cluster.2ksky9v.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.on('error', err => {
  console.log('DB connection failed');
});

mongoose.connection.on("connected", (connected) => {
  console.log("Connected with database ");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API end points
app.use("/user", userRoute);
app.use("/leave", leaveRoute);
app.use("/document", documentRoute);
app.use("/attendance", attendanceRoute);
app.use("/holiday", holidayRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad Request",
  });
});

module.exports = app;
