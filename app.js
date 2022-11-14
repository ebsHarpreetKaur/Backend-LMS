const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');




const userRoute = require('./api/routes/user');
const leaveRoute = require('./api/routes/leave');
const documentRoute = require('./api/routes/document');
const attendanceRoute = require('./api/routes/attendance');
const holidayRoute = require('./api/routes/holidays');

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


// Swagger Setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Leave Management System',
      version: '1.0.0'
    },
    servers: [
      {
        url: "http://localhost:1999"
      }
    ]
  },
  apis: ['app.js']
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Swagger Setup



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
