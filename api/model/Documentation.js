const mongoose = require("mongoose");

documentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  document_name: String,
  document_type: String,
  document_upload: Buffer,
});
module.exports = mongoose.model("document", documentSchema);
