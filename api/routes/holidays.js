const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Holiday = require("../model/holidays");
const checkAuth = require("../middleware/check-auth");


/**
 * @swagger
 * components:
 *     schema:
 *         holiday:
 *                type: object
 *                properties:
 *                    _id:
 *                        type: string
 *                    festival:
 *                        type: string
 *                    festivalDate:
 *                        type: string
 */


//================================================= POST holiday ==================================================
/**
 * @swagger
 * /holiday: 
 *  post:
 *      summary: Post/Add new holiday
 *      description: Post/Add new holiday
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/holiday'
 *      responses: 
 *          200:
 *              description: New holiday added successfully!
 */
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
//================================================= POST holiday ==================================================




//================================================= GET holidays pending through out the year==================================================
/**
 * @swagger
 * /holiday: 
 *  get:
 *      summary: Get all holidays of the year
 *      description: Get all holidays of the year
 *      responses: 
 *          200:
 *              description: Success! Get All Holidays
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/holiday'
 */
router.get("/", (req, res, next) => {

  var MyDate = new Date();
  var MyDateString;
  MyDate.setDate(MyDate.getDate());
  MyDateString =
    MyDate.getFullYear() +
    "-" +
    ("0" + (MyDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + MyDate.getDate()).slice(-2);

  var query = {
    festivalDate: {

      $gte: MyDateString,

    }

  };
  console.log(query)

  Holiday.find(query)
    .then((result) => {
      res.status(200).json({
        HolidaysPending: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//================================================= GET holidays pending through out the year==================================================

//================================================= GET particular holiday by ID==================================================
/**
 * @swagger
 * /holiday/{_id}: 
 *  get:
 *      summary: Get particular holiday by holidayID
 *      description: Get particular holiday by holidayID 
 *      parameters: 
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  ID required
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Click on try it out to get response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/holiday'
 */
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
//================================================= GET particular holiday by ID==================================================



//================================================= DELETE particular holiday by ID==================================================
/**
 * @swagger
 * /holiday/{_id}: 
 *  delete:
 *      summary: Delete particular holiday by holidayID
 *      description: Delete particular holiday by holidayID 
 *      parameters: 
 *          - in: path
 *            name: _id
 *            required: true
 *            description:  holidayID required
 *            schema:
 *              type: string
 *      responses: 
 *          200:
 *              description: Success! Holiday Deleted
 */
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
//================================================= DELETE particular holiday by ID==================================================



module.exports = router;

