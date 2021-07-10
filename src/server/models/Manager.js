const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ManagerSchema = new Schema({

  email: {
    type: String,
    required: true
  }

});

module.exports = Manager = mongoose.model("manager", ManagerSchema);