const mongoose = require('mongoose');

documentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  emp_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
  },
  documentname: {
    type: String,
    required: true,
    unique: true
  },
  documenttype: {
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