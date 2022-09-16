const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../model/employee');     //to craete collection in mongodb
const checkAuth = require('../middleware/check-auth');





// get all employees
router.get('/',checkAuth,(req,res,next)=>{
    Employee.find()
    .then(result=>{
        res.status(200).json({
            employeeData:result
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
})





// post employees
router.post('/',checkAuth,(req,res,next)=>{
    const employee = new Employee({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,              //body parser
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })
    employee.save() 
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newEmployee:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});



// get employees by id
router.get('/:id',checkAuth,(req,res,next)=>{
    console.log(req.params.id);
    Employee.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            employee:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })

})




// delete emeployees
router.delete('/:id',checkAuth,(req,res,next)=>{
    Employee.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"Employee Deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})




// update all data of an employee
router.put('/:id',checkAuth,(req,res,next)=>{
    console.log(req.params.id);
    Employee.findOneAndUpdate({_id:req.params.id},{
        $set:{
        name:req.body.name,              
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_employee:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})





module.exports  = router;             