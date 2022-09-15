// include express

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const studentRoute = require('./api/routes/student');
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

app.use('/student', studentRoute);
app.use('/user',userRoute);

app.use((req, res, next)=>{                        // Middleware(if user call it it will return response like res,req,next)
    res.status(404).json({
        error:'Bad Request'
    });                                 

});          


// if we want to use this anywhere then we have to export it
module.exports = app;


