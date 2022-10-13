const mongoose = require('mongoose');

documentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    emp_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee'
    }],
    documentName: String,
    documentType: String,
    file: Buffer,

}, { timestamps: true })


module.exports = mongoose.model('Document', documentSchema); 