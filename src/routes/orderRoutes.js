var express = require('express');
var router = express.Router();
var order = require('../models/order');
var mongoose = require('mongoose');
var auth = require('../middleware/auth');

router.get('/getOrders' , function(req, res){

    order.find().populate('ProductId').populate('UserId').then(
        data=>{res.json(data);
        }).catch(err =>{
            console.log(err)
            res.send('we could not get any order data');
        })

});

router.post('/saveOrder',  function(req, res){
    var productId = req.body.ProductId
    var userId = req.body.UserId

    var newOrder = new order({
        ProductId:productId,
        UserId:userId
    });
    newOrder.save(function(err){
        if(err){throw err}
        console.log(newOrder)
        res.json(newOrder);
    });
})

module.exports = router;