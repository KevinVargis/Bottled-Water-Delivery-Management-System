const mongoose = require("mongoose")
const Schema = mongoose.Schema
const RouteSchema = new Schema({

    date : {
        type: Date,
        required: true,
        default: Date.now()
    },

    customers : [
        {
            type: String,  //email
            required: true
        }
    ],
    totalcansrequired : {
        type: Number,
        required: true,
        default: 0
    },
    deliveries : [
        {
            type: mongoose.Schema.ObjectId,
        }
    ],
    tripid: {
        type: mongoose.Schema.ObjectId,
    },

    supervisorid : {
        type: mongoose.Schema.ObjectId, //users table will be used
        required: true
    },

    tripassigned: {
        type: Number,
        default: 0
    }
})

module.exports = Route = mongoose.model("routes", RouteSchema);