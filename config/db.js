require('dotenv').config()
const mongoose = require('mongoose');
let ConnectionString = "mongodb+srv://dbkingjay:3OahVG9a2P41OCaH@cluster3.nd4rh3e.mongodb.net/midterm?retryWrites=true&w=majority"

module.exports = function(){

    mongoose.connect(ConnectionString);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
}