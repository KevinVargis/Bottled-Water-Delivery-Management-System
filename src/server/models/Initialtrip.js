const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InitialtripSchema = new Schema({

    vehicle : {
        type: String,
        required: true
    },

    driver : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    managerid: {
        type: mongoose.Schema.ObjectId, //users table will be used
        // required: true
      }

});
module.exports = Initialtrip = mongoose.model("initialtrip", InitialtripSchema);
