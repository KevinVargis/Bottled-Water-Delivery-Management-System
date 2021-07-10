const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const inventoryupdate = require("../../validation/inventoryupdate")
const routecreation = require("../../validation/routecreation")

const Supervisor = require("../../models/Supervisor")
const Driver = require("../../models/Driver")
const Boy = require("../../models/Boy")
const Inventory = require("../../models/Inventory")
const Route = require("../../models/Route")
const Kharidaar = require("../../models/Kharidaar")
const Intermediatetrip = require("../../models/Intermediatetrip")
const Trip = require("../../models/Trip")


router.post("/Viewinventory", (req,res) => {
    Inventory.findOne({supervisorid: req.body.supervisorid}).then( (inventory,err) => {
    
        if(err) {
            console.log(err)
        }
        else {
            res.json(inventory)
            return res;
        }
    })
})

router.post("/Manageinventory", (req,res) => {

    Inventory.findOne({supervisorid: req.body.supervisorid}).then( (inventory,err) => {

        if(err) {
            console.log(err)
        }
        else {
            const { errors, isValid } = inventoryupdate(inventory,req.body)
            if (!isValid) {
                console.log(errors)
                return res.status(400).json(errors)
            }
            newinventory = new Inventory(inventory)
            newinventory.filled = newinventory.filled + req.body.filledadded - req.body.filledremoved
            newinventory.damaged = newinventory.damaged + req.body.damagedadded - req.body.damagedremoved
            newinventory.empty = newinventory.empty + req.body.emptyadded - req.body.emptyremoved
            Inventory.findByIdAndUpdate(newinventory._id, newinventory, {new: true}, function(err,newinventory){
                if(err){
                    console.log("gadbad ho gaya")
                }
                res.send(newinventory)
            })      
        }
    })
})

router.post("/Getdaycustomers", (req,res) => {
    var date = new Date()
    var cur_day = date.getDay()
    Kharidaar.find({$and:[{managerid: req.body.managerid},{day :cur_day}, {active: 1}]}).then((customers,err) => {

        if(err) {
            console.log(err)
        }
        else{
            res.send(customers)
        }
    })
})

router.post("/Getspecialcustomers", (req,res) => {
    nw = Date.now()
    Kharidaar.find({$and:[{managerid: req.body.managerid}, {deliverydate: {$gt:new Date(nw)}}, {active: 1}, {requested: 1}]}).then( (customers,err) => {
        if(err) {
            console.log(err)
        }
        else {
            res.send(customers)
        }
    })
})

router.post("/Viewroutes", (req,res) => {
    var cur_date = new Date()
    cur_date.setHours(0,0,0)
    // console.log(cur_date)
    Route.find({$and : [{supervisorid: req.body.supervisorid},{date: {$gte: new Date(cur_date)}},]}).then((routes,err) => {
        if(err) {
            console.log(err)
        }
        else {
            res.send(routes)
        }
    })
});

router.post("/Createroute", (req,res) => {
    const {errors,isValid} = routecreation(req.body)
    
    if (!isValid){
        return res.status(400).json(errors)
    }
    else {
        
        // console.log(req.body)
        const newroute = Route({
            customers: req.body.customers,
            totalcansrequired : req.body.totalcansrequired,
            supervisorid: req.body.supervisorid
        })
        newroute
            .save()
            .then(test => {
                return res.json(test)
            })
    }
});

router.post("/Gettrio", (req,res) => {
    //managerid
    // console.log("Kartik")
    var cur_date = new Date()
    cur_date.setHours(0,0,0)
    Intermediatetrip.find({$and : [{managerid: req.body.managerid},{date: {$gte: new Date(cur_date)}}]}).then((inter,err) => {
        // console.log(inter)
        if(err) {
            console.log(err)
        }
        else {
            res.send(inter)
        }
    })
});

router.post("/Gettrips", (req,res) => {
    //managerid
    // console.log("Kartik")
    var cur_date = new Date()
    cur_date.setHours(0,0,0)
    Trip.find({$and : [{supervisorid: req.body.supervisorid},{date: {$gte: new Date(cur_date)}}]}).then((trips,err) => {
        // console.log(trips)
        if(err) {
            console.log(err)
        }
        else {
            res.send(trips)
        }
    })
});


router.post("/Assignroute", async (req,res) => {

    await Route.findById(req.body.routeid, async function (err,route) {
        if(err){
            console.log(err)
        }
        else{
            newroute = new Route(route)
            newroute.tripassigned=1

            await Route.findByIdAndUpdate(newroute._id, newroute, {new:true}, async function(err,newroute){
                if(err){
                    console.log(err)
                }
                else{
                    await Intermediatetrip.findById(req.body.intermediatetripid,async function (err,inter) {
                        if(err){
                            console.log(err)
                        }
                        else{
                            newinter = new Intermediatetrip(inter)
                            newinter.routeassigned=1
                
                            await Intermediatetrip.findByIdAndUpdate(newinter._id, newinter, {new:true}, async function(err,newinter){
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    newtrip = Trip({
                                        supervisorid : req.body.supervisorid,
                                        driver: req.body.driver,
                                        boys : req.body.boys,
                                        vehicle : req.body.vehicle,
                                        filled : req.body.filled,
                                        customers: req.body.customers    
                                    })
                                    await Driver.findOne({aadharnum: req.body.driver}).then(async (driver,err) => {
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            newdriver = new Driver(driver)
                                            newdriver.tripid = newtrip._id
                                
                                            await Driver.findByIdAndUpdate(newdriver._id, newdriver, {new:true},async function(err,newdriver){
                                                if(err){
                                                    console.log(err)
                                                }
                                                else{
                                                    for(var i=0;i<req.body.boys.length;i++){
                                                        await Boy.findOne({aadharnum: req.body.boys[i]}).then(async (boy,err) => {
                                                            if(err){
                                                                console.log(err)
                                                            }
                                                            else{
                                                                newboy = new Driver(boy)
                                                                newboy.tripid = newtrip._id
                                                    
                                                                await Boy.findByIdAndUpdate(newboy._id, newboy, {new:true}, async function(err,newboy){
                                                                    if(err){
                                                                        console.log(err)
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    newtrip.save()
                                                    .then(test => {
                                                        return res.json(test)
                                                    })

                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })   
})

module.exports = router;