require('dotenv').config()
const mongoose = require('mongoose');
let ConnectionString = "mongodb+srv://dbAdmin:pcQBT6CTg13ZPvMy@cluster004.spyyzb6.mongodb.net/midterm?retryWrites=true&w=majority"

module.exports = function(){

    mongoose.connect(ConnectionString);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
}