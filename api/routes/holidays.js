const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Holiday = require("../model/holidays");
const checkAuth = require("../middleware/check-auth");




// post holiday
router.post('/', (req, res, next) => {
  const holiday = new Holiday({
    _id: new mongoose.Types.ObjectId,
    festival: req.body.festival,
    festivalDate: req.body.festivalDate,

  })
  holiday.save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        newHoliday: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
});





// get all holidays
router.get('/pending', (req, res, next) => {

  
  var query = {

    festivalDate: {
          $gte: ('2022-10-19')
          // $lte: new Date('2022-10-01').toISOString()
      },
 
    
  }
  Holiday.find(query, function (err, data) {
      if (err) { return res.status(300).json("Error") }
      else {
          return res.status(200).json({ HolidaysPending: data })
      }
  })

})



// view single holiday
router.get("/:_id", (req, res, next) => {
  console.log(req.params._id);
  Holiday.findById(req.params._id)
    .then((result) => {
      res.status(200).json({
        holidayData: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});




// delete holiday
router.delete("/:_id", (req, res, next) => {
  Holiday.remove({ _id: req.params._id })
    .then((result) => {
      res.status(200).json({
        message: "Holiday Deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});



module.exports = router;

