const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Document = require('../model/document');
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload')
// const multer=require('multer')
// const uploads=multer({dest:'uploads/'})

// Add Document
router.post('/add',(req,res)=>{
// router.post('/add',(req,res,next)=>{
    console.log(req,"jhgkjdfh")
    console.log(req.files,"jfdghdfkjhkj")
    console.log(req.file,"j12345")
     console.log(req.file)
     if(!req.file){res.send({code:500,msg:"err"})}
     else{res.send({code:200,msg:"upload success"})}
    try {
        if (!req.files) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            let file = req.files.file;

            console.log(file.name, "File name to upload");

//             file.mv("./uploads/" + file.name);

//             res.send({
//                 status: "success",
//                 message: "File is uploaded",
//                 data: {
//                     name: file.name,
//                     mimetype: file.mimetype,
//                     size: file.size,
//                 },
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// })




router.post('/add',upload.single('image'),(req, res, next) => {
    console.log(req.file,"request file")
    console.log(req,"Request")
    const document = new Document({
        _id: new mongoose.Types.ObjectId,
        emp_id: req.body.emp_id,
        documentName: req.body.documentName,
        documentType: req.body.documentType,
      
    }) 
    if (req.file){
        document.image = req.file.path 
    }
   
    document.save()
        .then(result => {
            console.log(result,"Result");
            res.status(200).json({
                newDocument: result
            })
        })
        .catch(err => {
            console.log(err,"Error");
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