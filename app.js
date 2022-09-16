// include express

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const employeeRoute = require('./api/routes/employee');
const userRoute = require('./api/routes/user');



mongoose.connect('mongodb+srv://harpreet:123@cluster.2ksky9v.mongodb.net/?retryWrites=true&w=majority')


mongoose.connection.on('error',err=>{
    console.log('DB connection failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('Connected with database ');
});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/employee', employeeRoute);
app.use('/user',userRoute);

app.use((req, res, next)=>{                        
    res.status(404).json({
        error:'Bad Request'
    });                                 

});          



module.exports = app;


