const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DriverSchema = new Schema({

  aadharnum: {
    type: String,
    required: true
  },
  
  managerid: {
      type: mongoose.Schema.ObjectId, //users table will be used
      required: true
  },

  tripid : {
      type: mongoose.Schema.ObjectId
  }, 

  pin :{
    type: String,
    required: false
  },

  attendance: [{
    description: {
      type: String,
      default: ' ',
      required: false
    },
    startDate: {
      type: Date,
      default: Date.now(),
      required: false
    },
    endDate: {
      type: Date,
      default: Date.now(),
      required: false
    }
  }],

  login: {
      type: Boolean,
      default:false,
      required: false
  }

});

module.exports = Driver = mongoose.model("driver", DriverSchema);