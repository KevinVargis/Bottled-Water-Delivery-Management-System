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
const Vehicle = require("../../models/Vehicle")
const IntialTrip = require("../../models/Initialtrip")
const IntermediateTrip = require("../../models/Intermediatetrip")
const FinalTrip = require("../../models/Trip");
const Trip = require("../../models/Trip");
const Initialtrip = require("../../models/Initialtrip");

router.post("/VehiclePair", (req, res) => {
   User.find({aadharnum: req.body.aadhar}, (err, Users) =>{
       if(err){
           res.json({
               status: 'failure',
               error: err
           })
       } 
       else{
        //    let a = ourUser.aadharnum
            if(Users.length == 0)
                res.json({
                    status: 'failure',
                    error: 'User not found',
                    drivers: Users[0]
                })
            else{
                console.log(1)
                Boy.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                    // console.log(Drivers)
                    // console.log(req.body.pin)
                    let checc = -1
                    // res.json({
                    //     status: "failure",
                    //     message: "Vehicle already has a driver"
                    // })
                    IntialTrip.find({vehicle: req.body.vehicle})
                        .then(yo =>{
                            if(yo.length != 0)
                            {
                                let a = yo[0]
                                a.boys = []
                                a.boys.push(req.body.aadhar)
                                a.ready = 0
                                // let b = IntermediateTrip(a)                                                                                                         
                                const b = IntermediateTrip({
                                    vehicle: a.vehicle,
                                    driver: a.driver,
                                    boys: [req.body.aadhar],
                                    managerid: a.managerid,
                                    ready: 0
                                })
                                console.log(2)
                                console.log(a)
                                console.log(b)
                                b.save()
                                    .then(yo => {
                                        console.log(3)
                                        let sav = yo
                                        Initialtrip.deleteOne({vehicle: req.body.vehicle})
                                            .then(yo => {
                                                Driver.findOneAndUpdate({aadharnum: sav.driver}, {tripid: sav.id})
                                                    .then(yo => {
                                                        Boy.findOneAndUpdate({aadharnum: sav.boys[0]}, {tripid: sav.id})
                                                            .then(yo => {
                                                                res.json({
                                                                    status: 'success',
                                                                    message: 'Boy added to trip'
                                                                })
                                                            })
                                                    })
                                            })
                                    })
                                    .catch(err => {
                                        console.log(4)
                                        res.json({
                                            status: "failure",
                                            message: err
                                        })
                                    })
                            }
                            else
                            {
                                console.log(1)
                                IntermediateTrip.find({vehicle: req.body.vehicle})
                                    .then(yo =>{
                                        if(yo.length != 0)
                                        {
                                            if(yo[0].ready == 0)
                                            {
                                                IntermediateTrip.findOneAndUpdate({vehicle: req.body.vehicle}, {"$push": { boys: req.body.aadhar }, $set:{ready: 1}})
                                                    .then(yo => {
                                                        Boy.findOneAndUpdate({aadharnum: req.body.aadhar}, {tripid: yo.id})
                                                            .then(yooo => {
                                                                console.log(yo)
                                                                res.json({
                                                                    status: 'success',
                                                                    message: 'boy added to trip, now full'
                                                                })
                                                            })
                                                        
                                                    })
                                                    .catch(err => {
                                                        res.json({
                                                            status: "failure",
                                                            message: err
                                                        })
                                                    })
                                            }
                                            else
                                            {
                                                res.json({
                                                    status: 'failure',
                                                    message: "Trip already full"
                                                })
                                            }
                                        }
                                        else
                                        {
                                            console.log(2)
                                            return res.json({
                                                status: "failure",
                                                message: "This vehicle does not have a driver yet"
                                            })
                                        }
                                    })
                            }
                        })
                });
            }
                // res.json(Drivers)
       }
   }) 
});
module.exports = router;