const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ComplaintSchema = new Schema({
    
  managerid: {
    type: mongoose.Schema.ObjectId,
    required: true
  },

  customerid: {
    type: mongoose.Schema.ObjectId,
    required: true
  },

  complaint : {
    type: String,
    // required: true
  },
  email : {
    type: String, 
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Complaint = mongoose.model("complaint", ComplaintSchema);