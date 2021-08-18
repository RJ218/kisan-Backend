var express = require('express');
var router = express.Router();
var product = require('../models/product');
var mongoose = require('mongoose');
var fetch = require('node-fetch')
var auth = require('../middleware/auth');

//add a middleware , auhtorization, 
router.get('/getProducts',  function(req, res){
    product.find().then(
        data=>{
            console.log(data)
            res.json(data);
        }).catch(err =>{
            res.send('we could not get any product data');
        })
   
});

router.post('/addProduct', function(req, res){
    var newProduct = new product({
        Name:req.body.Name,
        Title:req.body.Title,
        Photo:req.body.Photo,
        Description:req.body.Description,
    });
    newProduct.save(function(err){
        if(err){throw err}
        res.send('Product data saved');
    });
})

router.post('/temp', function(req, res){
    fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    for(let i = 0; i<json.length; i++)
    {
        var newProduct = new product({
            Title:json[i].title,
            Photo:json[i].image,
            Description:json[i].description,
            Price: json[i].price
        });
        newProduct.save(function(err){
            if(err){throw err}
            res.send('Product data saved');
        });   
    }
    }
  );
})

module.exports = router;