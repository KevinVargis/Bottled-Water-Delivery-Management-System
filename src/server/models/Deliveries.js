const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DeliverySchema = new Schema({


  tripid: {
    type: mongoose.Schema.ObjectId,
    required: true
  },

  customerid: {
    type: mongoose.Schema.ObjectId, //users table will be used
    required: true
  },
  
  supervisorid: {
    type: mongoose.Schema.ObjectId, //users table will be used
    required: true
  },

  damagedreturned: {
    type: Number,
    required: true,
    default: 0
  },

  filleddelivered: {
    type: Number,
    required: true
  },

  emptyreturned: {
    type: Number,
    required: true
  },

  agreedprice: {
    type: Number,
    required: true
  }
});

module.exports = Delivery = mongoose.model("delivery", DeliverySchema);