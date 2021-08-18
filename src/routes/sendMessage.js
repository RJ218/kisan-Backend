var express = require('express');
var router = express.Router();
var messageOtp = require('../models/messageOtp');
var mongoose = require('mongoose');
const SendOtp = require('sendotp');
var messagebird = require('messagebird')('73fn7ZGbOPTJOPQbGN51idrMZ');
const axios = require('axios');

router.get('/getAllMessages', function(req, res) {
    messageOtp.find().then(
        data=>{res.json(data);
        }).catch(err =>{
            res.send('we could not get any user data');
        })
})

router.post('/sendOtp', function(req, res) {
    var contactNumber = req.body.phoneNo
    var message = req.body.message

    contactNumber = '91' + contactNumber

    console.log(contactNumber)
    messagebird.messages.create({
        originator : contactNumber,
        recipients : [ contactNumber ],
        body : message
    },
    function (err, response) {
        if (err) {
        console.log("ERROR:");
        console.log(err);
        res.send(err)
    } else {
        console.log("SUCCESS:");
        console.log(response);
    res.send(response)
            }
    });
    
})

router.post('/saveMessage',async function(req, res){
    var phoneNo = req.body.phoneNo
    var otp = req.body.otp
    var message = req.body.message

    var newMessage = await new messageOtp({Otp: otp,
        UserPhoneNo: phoneNo})
    axios.post(
        'https://kisanbackend.herokuapp.com/sendOtp',
        {
            phoneNo: phoneNo,
            otp : otp ,
            message: message
        }
    ).then(()=>{
        newMessage.save(function(err){
            if(err){throw err}
            res.status(201).send(newMessage);
        });
    }).catch (( error)=>{
        //console.log(error)
        res.send(error)
    })


})

module.exports = router