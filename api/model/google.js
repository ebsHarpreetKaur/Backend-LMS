const mongoose = require('mongoose');  //adding db

googleUserSchema = new mongoose.Schema({
   
    google_Id: String,
    name:String,
    email:String, 
   
})


module.exports = mongoose.model('GoogleUser', googleUserSchema);