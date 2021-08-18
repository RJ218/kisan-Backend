var mongoose = require('mongoose');
var config = require('../config');

const mongoConfig = async () =>{
    const connection = await mongoose.connect(config.databaseUrl, ()=>{
        console.log('Connected to database')
    });
    return connection.connection.db;
}

module.exports = mongoConfig;