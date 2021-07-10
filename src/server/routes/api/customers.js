const express = require("express");
const router = express.Router();

const Kharidaar = require("../../models/Kharidaar")
const Complaint = require("../../models/Complaint")

const subscriptionModityInput = require("../../validation/subscription_modify")
const requestInput = require("../../validation/make_request")


router.post("/Togglestatus", (req,res) => {

    Kharidaar.findOne({email: req.body.email}).then( (kharidaar,err) => {

        if(err){
            console.log(err)
        }
        else {
            newkh = new Kharidaar(kharidaar)
            if (newkh.active == 1){
                newkh.active=0
            }
            else{
                newkh.active=1
            }
            Kharidaar.findByIdAndUpdate(newkh._id, newkh, {new: true}, function(err,newkh){
                if(err){
                    console.log(err)
                }
                res.send(newkh)
            })
        }
    })
})

router.post("/Modifysubs", (req,res) => {

    const { errors, isValid } = subscriptionModityInput(req.body);
    
    if (!isValid){
        console.log(errors)
        return res.status(400).json(errors)
    }

    Kharidaar.findOne({email: req.body.email}).then( (kharidaar,err) => {
        if(err){
            console.log(err)
        }
        else {
            newkh = new Kharidaar(kharidaar)
            newkh.subscansrequired = req.body.subscansrequired
            newkh.day = req.body.day
            Kharidaar.findByIdAndUpdate(newkh._id, newkh, {new: true}, function(err,newkh){
                if(err){
                    console.log(err)
                }
                else{
                    res.json(newkh)
                }
            })
        }
    })
})

router.post("/Requestcans", (req,res) => {

    const { errors, isValid } = requestInput(req.body);

    if (!isValid){
        console.log(errors)
        return res.status(400).json(errors)
    }

    Kharidaar.findOne({email: req.body.email}).then( (kharidaar,err) => {
        if(err){
            console.log(err)
        }
        else {
            newkh = new Kharidaar(kharidaar)
            newkh.requested = 1
            newkh.cansrequired = req.body.cansrequired
            newkh.deliverydate = new Date(req.body.deliverydate)
            Kharidaar.findByIdAndUpdate(newkh._id, newkh, {new: true}, function(err,newkh){
                if(err){
                    console.log(err)
                }
                else{
                    res.json(newkh)
                }
            })
        }
    })
})

router.post("/Registercomplaint", (req,res) => {

    newcomplaint = Complaint({
        managerid : req.body.managerid,
        customerid : req.body.customerid,
        complaint : req.body.complaint,
        email : req.body.email
    })

    newcomplaint.save()
        .then(complaint => {
            return res.json(complaint)
        })
        .catch(err => console.log(err))
})

module.exports = router;