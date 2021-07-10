  const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TripSchema = new Schema({


  driver: {
    type: String,
    required: true
  },
  
  boys: [{
      type: String,
      required: true,
      default: 0
  }
  ],
  // aadhar number is stored above as a string

  vehicle: {
      type: String,
      default: "DL"
  },

  date:{
      type: Date,
      required: true,
      default: Date.now()
  },

  filled: {
      type: Number,
      required: true,
      default: 0
  },

  empty: {
    type: Number,
    required: true,
    default: 0
  },

  damaged: {
    type: Number,
    required: true,
    default: 0
  },

  supervisorid: {
    type: mongoose.Schema.ObjectId, //users table will be used
    required: true
  },

  customers : [
    {
        type: String,  //email
        required: true
    }
  ]

});

module.exports = Trip = mongoose.model("trip", TripSchema);