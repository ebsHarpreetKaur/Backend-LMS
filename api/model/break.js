const mongoose = require("mongoose");

breakSchema = new mongoose.Schema(
    {
       
        Start: String,
        End: String,

    },
);

module.exports = mongoose.model("Break", breakSchema);