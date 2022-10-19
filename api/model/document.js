const mongoose = require('mongoose');

documentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
 
  documentName: {
    type: String,
    required: true,
    unique: true
  },
  documentType: {
    type: String,
    required: true,
    unique: true

  },
  image: {
    type: String,
    required: true
  }


}, { timestamps: true })


module.exports = mongoose.model('Document', documentSchema); 