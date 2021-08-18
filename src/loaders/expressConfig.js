var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var userRoute = require('../routes/userRoutes');
//var productRoute = require('../routes/productRoutes');
//var orderRoute = require('../routes/orderRoutes');
var sendMessage = require('../routes/sendMessage');



var app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

//app.use('/', userRoute);
//app.use('/', productRoute);
//app.use('/', orderRoute);
app.use('/', sendMessage)
module.exports = app;