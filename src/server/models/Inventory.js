const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InventorySchema = new Schema({


  supervisorid: {
    type: mongoose.Schema.ObjectId, //users table will be used
    required: true
  },

  filled: {
      type: Number,
      required: true,
      default: 0
  },

  empty : {
      type: Number,
      required: true,
      default: 0
  },

  damaged : {
      type: Number,
      required: true,
      default: 0
  }
});

module.exports = Inventory = mongoose.model("inventory", InventorySchema);