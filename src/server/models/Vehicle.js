const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({


  licenseplatenumber: {
    type: String,
    required: true
  },
  

  rcenddate: {
      type: Date,
      required: true
  },

  pucenddate: {
    type: Date,
    required: true
  },

  fitnessenddate: {
    type: Date,
    required: true
  },

  quarterlytaxenddate: {
    type: Date,
    required: true
  },

  greentaxenddate: {
    type: Date,
    required: true
  },

  insuranceenddate: {
    type: Date,
    required: true
  },
  managerid: {
    type: mongoose.Schema.ObjectId, //users table will be used
    required: true
  },
  companyid : {
    type: mongoose.Schema.ObjectId,
    required: true
  }

});

module.exports = Vehicle = mongoose.model("vehicle", VehicleSchema);