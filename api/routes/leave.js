const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Leave = require('../model/leave');     //to create collection in mongodb
const checkAuth = require('../middleware/check-auth');





// get all leaves
router.get('/',checkAuth,(req,res,next)=>{
    Leave.find()
    .then(result=>{
        res.status(200).json({
            leaveData : result
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    });
})





// Apply Leave
router.post('/',(req,res,next)=>{
    const leave = new Leave({
        _id:new mongoose.Types.ObjectId,
        EmployeeName : req.body.EmployeeName,              //body parser
        SupervisorName : req.body.SupervisorName,
        Department : req.body.Department,
        LeaveType : req.body.LeaveType,
        LeaveDate : req.body.LeaveDate,
        ReturnDate : req.body.ReturnDate,
        TotalHoursRequested : req.body.TotalHoursRequested,
        TotalDaysRequested : req.body.TotalDaysRequested
        
    })
    leave.save() 
    .then(result=>{
        console.log(result);
        res.status(200).json({
            newLeave:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});



// get Leave by id
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




// delete Leave
router.delete('/:id', checkAuth, (req,res,next)=>{
    Leave.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"Leave Deleted",
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})




// update leave
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Leave.findOneAndUpdate({_id:req.params.id},{
        $set:{
        EmployeeName : req.body.EmployeeName,              //body parser
        SupervisorName : req.body.SupervisorName,
        Department : req.body.Department,
        LeaveType : req.body.LeaveType,
        LeaveDate : req.body.LeaveDate,
        ReturnDate : req.body.ReturnDate,
        TotalHoursRequested : req.body.TotalHoursRequested,
        TotalDaysRequested : req.body.TotalDaysRequested
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_leave:result
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