const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Document = require('../model/document');
const checkAuth = require('../middleware/check-auth');






// Add Document
router.post('/add', (req, res, next) => {

    const document = new Document({
        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        documentName: req.body.documentName,
        documentType: req.body.documentType,
        file: req.body.file,
    })
    document.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newDocument: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});




// get Document by id
router.get('/:_id', (req, res, next) => {
    console.log(req.params._id);
    Document.findById(req.params._id)
        .then(result => {
            res.status(200).json({
                document: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})





// delete Document
router.delete('/:_id', (req, res, next) => {
    Document.remove({ _id: req.params._id })
        .then(result => {
            res.status(200).json({
                message: "Document Deleted",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})





// update/modify Document
router.put('/:_id', (req, res, next) => {
    console.log(req.params._id);
    console.log(req.body.documentName, "documentName")
    Document.findOneAndUpdate({ _id: req.params._id }, {
        $set: {
         
            documentName: req.body.documentName,
            documentType: req.body.documentType,
            file: req.body.file,
        }

    }

    )
        .then(result => {
            res.status(200).json({
                updated_document: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})




module.exports = router;    