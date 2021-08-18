var express = require('express');
var router = express.Router();
var user = require('../models/user');
var mongoose = require('mongoose');
//var bcrypt = require('bcryptjs');
//var jwt = require('jsonwebtoken');
var config = require('../config');

router.get('/getusers', function(req, res){
    user.find().then(
        data=>{res.json(data);
        }).catch(err =>{
            res.send('we could not get any user data');
        })

});

router.post('/signIn',async function(req, res){
    try{
    var userEmail = req.body.Email
    var userPassword = req.body.Password

    if (!(userEmail && userPassword)) {
        console.log('all inputs needed')
        res.status(400).send("All inputs are required");
      }

    const userDocument = await user.findOne({ Email: userEmail });

    if (userDocument && (await bcrypt.compare(userPassword, userDocument.Password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, userPassword },
          config.secretKey,
          {
            expiresIn: "2h",
          }
        );

        userDocument.Token = token
        res.status(200).json(userDocument);
        return
    }
    res.status(400).send("Invalid Credentials");
    } catch(err){
        console.log(err);
    }
 
})

router.post('/checkToken', function(req, res){
    var token = req.body.token
    console.log(token)
    if(jwt.verify(token, config.secretKey))
    {
        res.send(true)
    }
    else{
        res.send(false)
    }
})

router.post('/saveUser',async function(req, res){
    var userEmail = req.body.Email
    var userPassword = req.body.Password

    if (!(userPassword && userEmail)) {
        res.status(400).send("All inputs Are Required");
      }
      const oldUser = await user.findOne({ Email: userEmail });
    
      if (oldUser) {
          
        return res.status(409).send("Email Id Already Registered. Please Login Using the Same");
      }

      encryptedPassword = await bcrypt.hash(userPassword, 10);

    var newUser = await new user({
        Email: userEmail,
        Password: encryptedPassword
    });

    const token = jwt.sign(
        { user_id: user._id, userEmail },
        config.secretKey,
        {
          expiresIn: "2h",
        }
      );
      newUser.Token = token
        console.log(newUser)
    newUser.save(function(err){
        if(err){throw err}
        res.status(201).send(newUser);;
    });
})

module.exports = router;