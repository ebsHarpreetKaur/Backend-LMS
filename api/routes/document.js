const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Document = require('../model/document');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/jpg') {
        cb(null, true);
    } 
    // else if (file.mimetype === 'file/pdf') {
    //     cb(null, true)
    // } 
    else {
        cb(null, false);
    }

}

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024  1024  5      // 5 MB
    // },
    fileFilter: fileFilter
})





// upload Document 
router.post('/add/:emp_id', upload.single('image'), function (req, res, next) {
    // console.log("Hello request",req)
    console.log("Hello Image Here", req.file);
    console.log("documentname", req.body.documentname);
    console.log("documenttype", req.body.documenttype);
    console.log("body",req.body)
    const document = new Document({

        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        documentname: req.body.documentname,
        documenttype: req.body.documenttype,
        image: req.file.path

    })
    document.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                documentRecord: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


// Document Record of Particular Employee
router.get("/:emp_id", (req, res, next) => {
    console.log(req.params.emp_id);
    Document.find({ emp_id: req.params.emp_id })
        .then((result) => {
            res.status(200).json({
                documentData: result,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});





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