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

router.post("/SignIn", (req, res) => {
    console.log(req.body)
   User.find({email: req.body.email}, (err, Users) =>{
       if(err){
           console.log("geyy")
           console.log(err)
           res.json({
               status: 'failure',
               error: err
           })
       }
       else{
        //    let a = ourUser.aadharnum
        console.log("found user")
            if(Users.length == 0)
                res.json({
                    status: 'failure',
                    error: 'Email not found',
                    drivers: Users[0]
                })
            else if (Users[0].type=='D'){
                
                Driver.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                    console.log(Drivers)
                    // console.log(req.body.pin)
                if(Drivers.length == 0)
                    res.json({
                        status: 'failure',
                        num: Users[0].email,
                        error: 'Email not found',
                        data: Users[0],
                        
                    })
                else if(Drivers[0].pin == req.body.pin)
                    res.json({
                        status: 'success',
                        aadhar: Drivers[0].aadharnum
                    })
                else
                    res.json({
                        status: 'failure',
                        error: "Pin does not match"
                        
                    })
                });
            }
            else{
                Boy.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                    // console.log(Drivers)
                    // console.log(req.body.pin)
                if(Drivers.length == 0)
                    res.json({
                        status: 'failure',
                        num: Users[0].email,
                        error: 'Email not found',
                        data: Users[0],
                        
                    })
                else if(Drivers[0].pin == req.body.pin)
                    res.json({
                        status: 'success',
                        aadhar: Drivers[0].aadharnum
                    })
                else
                    res.json({
                        status: 'failure',
                        error: "Pin does not match"
                        
                    })
                });
            }
                // res.json(Drivers)
       }
   }) 
});

router.post("/GetInfo", (req, res) => {
    console.log(req.body)
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
                if(Users[0].type == 'D')
                {
                    Driver.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                        // console.log(Drivers)
                        // console.log(req.body.pin)
                    if(Drivers.length == 0)
                        res.json({
                            status: 'failure',
                            num: Users[0].email,
                            error: 'User not found',
                            data: Users[0],
                            
                        })
                    else
                    {
                        const result = {};
                        res.json({
                            // result
                            userData: Users[0],
                            driverData: Drivers[0]
                        })
                    }
                    });
                }
                else if(Users[0].type == 'B')
                {
                    Boy.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                        // console.log(Drivers)
                        // console.log(req.body.pin)
                    if(Drivers.length == 0)
                        res.json({
                            status: 'failure',
                            num: Users[0].email,
                            error: 'User not found',
                            data: Users[0],
                            
                        })
                    else
                    {
                        const result = {};
                        res.json({
                            // result
                            userData: Users[0],
                            driverData: Drivers[0]
                        })
                    }
                    });
                }
            }
                // res.json(Drivers)
       }
   }) 
});


router.post("/AttLog", (req, res) => {
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
                // console.log(1)
                if(Users[0].type == 'D')
                {
                    Driver.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                        // console.log(Drivers)
                        // console.log(req.body.pin)
                    if(Drivers.length == 0)
                        res.json({
                            status: 'failure',
                            num: Users[0].email,
                            error: 'User not found',
                            data: Users[0],
                            
                        })
                    else
                    {
                        if(Drivers[0].login == false)
                        {
                            var d = new Date();
                            d.setFullYear(9998, 10, 3)
                            Drivers[0].login = true
                            let lenn = Drivers[0].attendance.length
                            Drivers[0].attendance.push({
                                description: "Duty Hours",
                                startDate: Date.now(),
                                endDate:d
                            })
                        }
                        else
                        {
                            Drivers[0].login = false
                            let lenn = Drivers[0].attendance.length
                            let a = Drivers[0].attendance[lenn-1]
                            a.endDate=Date.now()
                            Drivers[0].attendance.pop()
                            Drivers[0].attendance.push(a)
                        }
                        Driver.findOneAndUpdate({aadharnum: req.body.aadhar}, {attendance: Drivers[0].attendance, login: Drivers[0].login})
                        .then( res => {
                            console.log("yey")
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                    // console.log(7)
                    res.json({status: 'suc'})
                    }
                    });
                }
                else if(Users[0].type == 'B')
                {
                    // console.log(2)
                    Boy.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
                        // console.log(Drivers)
                        // console.log(req.body.pin)
                    if(Drivers.length == 0)
                        res.json({
                            status: 'failure',
                            num: Users[0].email,
                            error: 'User not found',
                            data: Users[0],
                            
                        })
                    else
                    {
                        // console.log(3)
                        if(Drivers[0].login == false)
                        {
                            // console.log(4)
                            var d = new Date();
                            d.setFullYear(9998, 10, 3)
                            Drivers[0].login = true
                            let lenn = Drivers[0].attendance.length
                            Drivers[0].attendance.push({
                                description: "Duty Hours",
                                startDate: Date.now(),
                                endDate:d
                            })
                        }
                        else
                        {
                            // console.log(5)
                            Drivers[0].login = false
                            let lenn = Drivers[0].attendance.length
                            let a = Drivers[0].attendance[lenn-1]
                            a.endDate=Date.now()
                            Drivers[0].attendance.pop()
                            Drivers[0].attendance.push(a)
                        }
                        // console.log(6)
                        Boy.findOneAndUpdate({aadharnum: req.body.aadhar}, {attendance: Drivers[0].attendance, login: Drivers[0].login})
                            .then( res => {
                                console.log("yey")
                            })
                            .catch(err =>{
                                console.log(err)
                            })
                        // console.log(7)
                        res.json({status: 'suc'})
                    }
                    });
                }
            }
                // res.json(Drivers)
       }
   }) 
});
router.post("/VehiclePair", (req, res) => {
    console.log(req.body)
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
                // console.log(1)
                Driver.find({aadharnum: Users[0].aadharnum}, (err, Drivers) =>{
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
                                return res.json({
                                    status: "failure",
                                    message: "Vehicle already has a driver"
                                })
                            else
                            {
                                console.log(1)
                                IntermediateTrip.find({vehicle: req.body.vehicle})
                                    .then(yo =>{
                                        if(yo.length != 0)
                                            return res.json({
                                                status: "failure",
                                                message: "Vehicle already has a driver"
                                            })
                                        else
                                        {
                                            console.log(2)
                                            Trip.find({vehicle: req.body.vehicle})
                                                .then(yo =>{
                                                    if(yo.length != 0)
                                                        return res.json({
                                                            status: "failure",
                                                            message: "Vehicle already has a driver"
                                                        })
                                                    else
                                                    {
                                                        console.log(3)
                                                        Vehicle.find({licenseplatenumber: req.body.vehicle})
                                                            .then(veh =>{
                                                                if(veh.length != 0)
                                                                {
                                                                    const boi = Initialtrip({
                                                                        vehicle: req.body.vehicle,
                                                                        driver: req.body.aadhar,
                                                                        managerid: veh[0].managerid
                                                                    })
                                                                    boi.save()
                                                                        .then(ye =>{
                                                                            console.log('ye', ye)
                                                                            Driver.findOneAndUpdate({aadharnum:req.body.aadhar}, {tripid:ye._id})
                                                                                .then( res => {
                                                                                    console.log("yey")
                                                                                })
                                                                                .catch(err =>{
                                                                                    console.log(err)
                                                                                })
                                                                            return res.json({
                                                                                status: "success",
                                                                                tripid: ye.id
                                                                            })
                                                                            console.log("why")
                                                                        })
                                                                        .catch(err =>{
                                                                            console.log(err)
                                                                        })
                                                                }
                                                                else
                                                                {
                                                                    return res.json({
                                                                        status: "failure",
                                                                        message: "This vehicle isn't registered in the database"
                                                                    })
                                                                }
                                                            })
                                                        
                                                    }
                                                })
                                        }
                                    })
                            }
                        })

                        
                    
                    // Trip.find({vehicle: req.body.vehicle})
                    //     .then(yo =>{
                    //         if(yo.length != 0)
                    //             checc = 0
                    //     })
                    // if(checc == 0)
                    //     return res.json({
                    //         status: "failure",
                    //         message: "Vehicle already has a driver"
                    //     })
                    // else
                    // {
                        
                    // }
                });
            }
                // res.json(Drivers)
       }
   }) 
});


router.post("/ScanCustomer", (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(req.body.tripid)
    console.log(o_id)
    console.log(req.body)
    Trip.findOne({_id : o_id}) //see if this works
        .then(trip => {
            // console.log(trip.toJSON().customers)
            if(trip!=null)
            {
                if(trip.toJSON().customers.includes(req.body.email))
                {
                    return res.json({
                        status: 'success',
                        message: 'yey'
                    })
                }
                else
                    return res.json({
                        status: 'failure',
                        message: 'This customer is not in your current trip'
                    })
            }
            else
                return res.json({
                    status: 'failure',
                    message: 'You are associated with a trip that hasn\'t started yet or is invalid'
                })
        })
});

router.post("/UpdateDetails", (req, res) => {
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(req.body.tripid)
    console.log(req.body)
    // fil = 
    Trip.findOneAndUpdate({_id : o_id}, {'$inc': {filled: -parseInt(req.body.filled), empty: parseInt(req.body.empty), damaged: parseInt(req.body.damaged)}}) //see if this works
        .then(trip => {
            return res.json({
                status: 'success',
                message: 'yey'
            })
        })
        .catch(err => {
            
        })
});

module.exports = router;