const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const KharidaarSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  

  managerid: {
      type: mongoose.Schema.ObjectId, //users table will be used
      required: true
  },

  geocoordinates: {

    latitude: {
        type: Number,
        required: true,
        default: 0
    },
    longitude: {
        type: Number,
        required: true,
        default: 0
    }
  },

  requested : {
    type:Number,
    required: true,
    default: 0
  },

  active : {
    type:Number,
    required: true,
    default: 0
  },

  cansrequired : {
    type:Number,
    required: true,
    default: 0
  },

  subscansrequired : {
    type:Number,
    required: true,
    default: 0
  },

  day : {
    type:Number,
    required: true,
    default: 0

    // 0 - sunday
    // 1 - tuesday
    // .
    // .
    // 6 - saturday
  },
  deliverydate : {
    type: Date,
    default: Date.now()
  } 

});

module.exports = Kharidaar = mongoose.model("kharidaar", KharidaarSchema);