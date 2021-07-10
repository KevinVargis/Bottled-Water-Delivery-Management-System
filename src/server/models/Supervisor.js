const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SupervisorSchema = new Schema({

  email: {
    type: String,
    required: true
  },

  managerid: {
      type: mongoose.Schema.ObjectId, //id of users table is used
      required: true
  }

});

module.exports = Supervisor = mongoose.model("supervisor", SupervisorSchema);