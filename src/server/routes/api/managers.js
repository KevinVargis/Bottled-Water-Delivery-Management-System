const express = require("express");

const bodyParser = require('body-parser');



const router = express.Router();
const bcrypt = require("bcryptjs");

const supervisorRegisterInput = require("../../validation/register_supervisor");
const boyRegisterInput = require("../../validation/register_boy");
const driverRegisterInput = require("../../validation/register_driver");
const kharidaarRegisterInput = require("../../validation/register_kharidaar")
const vehicleRegisterInput = require("../../validation/register_vehicle") 



const Boy = require("../../models/Boy")
const Driver = require("../../models/Driver")
const Supervisor = require("../../models/Supervisor")
const Kharidaar = require("../../models/Kharidaar")
const User = require("../../models/User")
const Inventory = require("../../models/Inventory")
const Vehicle = require("../../models/Vehicle");
const Complaint = require("../../models/Complaint");

router.post("/Supervisorregister", (req, res) => {
    const { errors, isValid } = supervisorRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        }
        else {
            // console.log(req.body)
            const newuser = User({
                name: req.body.name,
                email: req.body.email,
                line1: req.body.line1,
                line2: req.body.line2,
                line3: req.body.line3,
                pincode: parseInt(req.body.pincode),
                password: req.body.password1,
                aadharnum: req.body.aadharnum,
                phonenum: req.body.phonenum,
                companyid: req.body.companyid,
                type: "S"
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newuser.password = hash;
                    newuser
                        .save()
                        .then(user => {
                            res.json(user)
                            const newsuper = Supervisor({
                                email: req.body.email,
                                managerid: req.body.managerid
                            })
                            newsuper
                                .save()
                                .then(supervisor => {
                                    const newinventory = Inventory({
                                        supervisorid : user._id,
                                        filled: 0,
                                        empty: 0,
                                        damaged: 0
                                    })

                                    newinventory
                                        .save()
                                        .then(invent => {
                                            return res
                                        })
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    })
})

router.post("/Driverregister", (req, res) => {
    const { errors, isValid } = driverRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ aadharnum: req.body.aadharnum }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Aadhar number already exists" });
        }
        else {
            const newuser = User({
                name: req.body.name,
                line1: req.body.line1,
                line2: req.body.line2,
                line3: req.body.line3,
                email: req.body.email,
                pincode: parseInt(req.body.pincode),
                password: req.body.password1,
                aadharnum: req.body.aadharnum,
                phonenum: req.body.phonenum,
                companyid: req.body.companyid,
                type: "D"
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newuser.password = hash;
                    newuser
                        .save()
                        .then(user => {
                            res.json(user)
                            const newdriver = Driver({
                                aadharnum: req.body.aadharnum,
                                managerid: req.body.managerid,
                                pin: "1234"
                            })
                            newdriver
                                .save()
                                .then(driver => {
                                    return res
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                });
            });

            
        }
    })
})

router.post("/Vehicleregister", (req, res) => {
    // console.log("Aaradhya rocks")
    const { errors, isValid } = vehicleRegisterInput(req.body);
    // console.log(errors)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Vehicle.findOne({ licenseplatenumber: req.body.licenseplatenumber }).then(user => {
        if (user) {
            return res.status(400).json({ licenseplatenumber: "License plate number already exists" });
        }
        else {
            const newuser = Vehicle({
                licenseplatenumber : req.body.licenseplatenumber,
                rcenddate : new Date(req.body.rcenddate),
                pucenddate : new Date(req.body.pucenddate),
                fitnessenddate : new Date(req.body.fitnessenddate),
                quarterlytaxenddate : new Date(req.body.quarterlytaxenddate),
                greentaxenddate : new Date(req.body.greentaxenddate),
                insuranceenddate : new Date(req.body.insuranceenddate),
                companyid: req.body.companyid,
                managerid: req.body.managerid
            })
            newuser
                .save()
                .then(driver => {
                    // console.log("Aaradhya")
                    return res.json(driver)
                })
                .catch(err => console.log(err));
        }
    })
})

router.post("/Boyregister", (req, res) => {
    const { errors, isValid } = boyRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors)
    }
    // console.log("Kartik0")
    
    User.findOne({ aadharnum: req.body.aadharnum }).then(user => {
        // console.log("Kartik0.5")

        if (user) {
            // console.log("Kartik0.75")

            return res.status(400).json({ email: "Aadhar number already exists" });
        }
        else {
            // console.log("Kartik1")
            const newuser = User({
                name: req.body.name,
                line1: req.body.line1,
                line2: req.body.line2,
                line3: req.body.line3,
                email: req.body.email,
                pincode: parseInt(req.body.pincode),
                password: req.body.password1,
                aadharnum: req.body.aadharnum,
                phonenum: req.body.phonenum,
                companyid: req.body.companyid,
                type: "B"
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newuser.password = hash;
                    newuser
                        .save()
                        .then(user => {
                            res.json(user)
                            // console.log("Kartik2")

                            const newboy = Boy({
                                aadharnum: req.body.aadharnum,
                                managerid: req.body.managerid,
                                pin:"1234"
                            })
                            newboy
                                .save()
                                .then(boy => {
                                    // console.log("Kartik3")

                                    return res
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                });
            });

            
        }
    })
})

router.post("/Kharidaarregister", (req, res) => {
    // console.log(req.body)
    const { errors, isValid } = kharidaarRegisterInput(req.body);
    if (!isValid) {
        console.log(errors)
        return res.status(400).json(errors)
    }
    User.findOne({ aadharnum: req.body.aadharnum }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Aadhar number already exists" });
        }
        else {
            const newuser = User({
                name: req.body.name,
                line1: req.body.line1,
                line2: req.body.line2,
                line3: req.body.line3,
                email: req.body.email,
                pincode: parseInt(req.body.pincode),
                password: req.body.password1,
                aadharnum: req.body.aadharnum,
                phonenum: req.body.phonenum,
                companyid: req.body.companyid,
                type: "K",

            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newuser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newuser.password = hash;
                    newuser
                        .save()
                        .then(user => {
                            res.json(user)
                            const newkharidaar = Kharidaar({
                                email: req.body.email,
                                managerid: req.body.managerid,
                                geocoordinates: req.body.geocoordinates
                            })
                            newkharidaar
                                .save()
                                .then(kharidaar => {
                                    return res
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    })
})

router.post("/Viewvehicles", (req,res) => {
    Vehicle.find({managerid: req.body.managerid}, (err, Vehicles) => {
    //   console.log(err);
      if (err) {
        console.log(err);
      }
      else {
        res.json(Vehicles);
      } 
    })
  
});

router.post("/Viewcomplaints", (req,res) => {
    // console.log("test")
    Complaint.find({managerid: req.body.managerid}, (err, complaints) => {
    //   console.log(err);
    // console.log(complaints)
      if (err) {
        console.log(err);
      }
      else {
        res.json(complaints);
      } 
    })
});

router.post("/Deletecomplaint", (req,res) => {
    Complaint.findByIdAndDelete(req.body.id, function(err){
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json('Employee Deleted...')
    })
})

module.exports = router;
