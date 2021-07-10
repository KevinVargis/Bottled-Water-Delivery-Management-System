const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IntermediatetripSchema = new Schema({

    vehicle : {
        type: String,
        required: true
    },

    driver : {
        type : String,
        required : true
    },
    boys: [{
        type: String,
    }
    ],
    ready : {
        type: Number,
        default: 0,
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    managerid: {
        type: mongoose.Schema.ObjectId, //users table will be used
        // required: true
    },
    
    routeassigned: {
        type: Number,
        default: 0  
    }

});
module.exports = Intermediatetrip = mongoose.model("intermediatetrip", IntermediatetripSchema);
