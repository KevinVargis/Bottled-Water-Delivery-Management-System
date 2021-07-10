const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  line1 : {
    type: String,
    required: true
  },
  line2 : {
    type: String,
    required: true
  },
  pincode: {
      type: Number,
      required: true
  },
  line3 : {
    type: String,
    required: true
  },
  GSTNo: {
      type: String,
      required: true,
      default: ""
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Company = mongoose.model("company", CompanySchema);