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
    if (file.mimetype === 'image/png') {
        cb(null, true);
    } else if (file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else if (file.mimetype === 'image/jpg') {
        cb(null, true)
    } else if (file.minetype === 'application/msword') {
        cb(null, true)
    } else if (file.mimetype === 'application/pdf') {
        cb(null, true)
    } else if (file.mimetype === 'application/msword') {
        cb(null, true)
    } else {
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

//======================================================= GET all documents========================================
/**
 * @swagger
 * /document: 
 *  get:
 *      summary: Get all documents 
 *      description: Get all documents 
 *      responses: 
 *          200:
 *              description: Success! Get all documents
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/document'
 */
router.get("/", (req, res, next) => {
    Document.find()
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
//======================================================= GET all documents========================================

//======================================================= POST/upload document ========================================
/**
 * @swagger
 * /document/add/{emp_id}: 
 *  put:
 *      summary: Edit document of particular employee 
 *      description: Edit document of particular employee
 *      parameters: 
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description:  EmployeeID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/document'
 *      responses: 
 *          200:
 *              description: Success! document Updated
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/document'
 */
// upload Document 
router.post('/add/:emp_id', upload.single('image'), function (req, res, next) {
    // console.log("Hello request",req)
    console.log("Hello Image Here", req.file);
    console.log("documentname", req.body.documentname);
    console.log("documenttype", req.body.documenttype);
    console.log("body", req.body)
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
//======================================================= POST/upload document ========================================

//======================================================= GET particular document of user ========================================
/**
 * @swagger
 * /document/{emp_id}: 
 *  get:
 *      summary: Get particular document by EmployeeID
 *      description: Get particular document by EmployeeID 
 *      parameters: 
 *          - in: path
 *            name: emp_id
 *            required: true
 *            description:  EmployeeID required
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Success! Get document 
 */
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
//======================================================= GET particular document of user ========================================

//======================================================= GET all documents of user ========================================
/**
 * @swagger
 * /document: 
 *  get:
 *      summary: Get all documents
 *      description: Get all documents 
 *      responses: 
 *          200:
 *              description: Success! Get all documents 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/document'
 */
router.get("/", (req, res, next) => {
    Document.find()
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
//======================================================= GET all documents of user ========================================

//======================================================= DELETE particular document of user ========================================
/**
 * @swagger
 * /document/{_id}: 
 *  delete:
 *      summary: Delete particular document by documentID
 *      description: Delete particular document by documentID 
 *      parameters: 
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  documentID required
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Success! document deleted
 */
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
//======================================================= DELETE particular document of user ========================================

//======================================================= UPDATE particular document of user ========================================
/**
 * @swagger
 * /document/{_id}: 
 *  put:
 *      summary: Update document
 *      description: Update document
 *      parameters: 
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  documentID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/document'
 *      responses: 
 *          200:
 *              description: Success! document Updated
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/document'
 */
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
//======================================================= UPDATE particular document of user ========================================




module.exports = router;    