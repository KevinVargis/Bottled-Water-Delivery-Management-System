const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    aadharnum : {
        type: String,
        required : true
    },
    
    phonenum: {
        type: String,
        required: true
    },
    
    line1 : {
        type: String,
        required: true
    },

    line2 : {
        type: String,
        required: true
    },
    
    pincode: {
        type: Number,
        required: true
    },
    
    line3 : {
        type: String,
        required: true
    },

    companyid : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    
    type: {
        type: String,
        required: true
        /*
        M : manager
        S : supervisor
        D : driver 
        B : delivery boy
        K : kharidaar
        */
        
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    } 

});

module.exports = User = mongoose.model("users", UserSchema);