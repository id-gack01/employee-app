//remember to start with the requirements, mongoose will be using this folder so 

const mongoose = require('mongoose');

// gotta create an employee model and put it in a variable, call the model function and pass it a name and some data structure thing

var Employee = mongoose.model('Employee', {
    name : {type:String},
    position : {type:String},
    office : {type:String},
    salary : {type: Number},

});

//need to export it using the mongoose.exports

module.exports = {Employee};