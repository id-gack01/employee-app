// const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router(); //see this is the Router object that holds the get, set, a,findByID, post, delete functions.  
//I need the exported employee variable from the models directory
// the employees.js file in the modules exports its self using the module.exports 
var {Employee} = require('../models/employee.js');
// Types.ObjectID performs some sort of verification bullshit
var ObjectID = require('mongoose').Types.ObjectId;


//writing the controllers to set up the get, set, post, and delete functions, needs a callback function for the errors
//each link has to have its own get function

//need to make a get request to localhost:3000/employees/
router.get('/',  (req,res) => {

    Employee.find((err,docs) => {

        //if there's no error, the docs object gets sent to the database using the send function in the response object
        if (!err) {res.send(docs);} 
        else { console.log('Error in Retrieving Employees: ' + JSON.stringify(err, undefined, 2));}
    });
    

})

// can post a new employee using the same model that exists in the employee.js file. the names preceding the : all correspond to the model
// the request object fields name, position, office, salary, are all
router.post('/',(req,res) => {


    //this is the employee model
    //notice how a variable holds a model for the request that assigns values using corresponding  fields in the http request 
    var emp = new Employee({
    name : req.body.name ,
    position : req.body.position ,
    office : req.body.office ,
    salary : req.body.salary  
    });
    emp.save((err,doc) => {

        if (!err) {res.send(doc);}
        else { console.log('Error in Saving Employee: ' + JSON.stringify(err, undefined, 1));} 

    } );
} );


//also want to make a get request for a specific employee based on an ID

router.get('/:id', (req,res) => {
// first make sure that the id is valid before running find by id
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send('No record with given ID: ${req.params.id}');
// 
// 

//the Employee object imported into this controller has a findById function that lets me use the id as key to search for a corresponding pair
 Employee.findById(req.params.id,(err,doc) => {

    if (!err) {res.send(doc);}
    else { console.log('Error in Finding Employee: ' + JSON.stringify(err, undefined, 1));} 
                                                    });
// 
// 
// 
})
// need a route for router.put, router.delete
router.put('/:id', (req,res) => {
    
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('No record with given ID: ${req.params.id}');

    var emp = {
        name : req.body.name ,
        position : req.body.position ,
        office : req.body.office ,
        salary : req.body.salary  
        };

        // {new : true} guarantees that the new value of the updated id will be displayed
    //need to find the id of the employee and update it, there's a function with the name
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new : true}, (err,doc) => {

        if (!err) {res.send(doc);} 
        else { console.log('Error in Updating Employee: ' + JSON.stringify(err, undefined, 2));}
    } );    
})

// 

// need a delete function too

router.delete('/:id', (req,res) => {
    if (!ObjectID.isValid(req.params.id)) 
    return res.status(400).send('No record with given ID: ${req.params.id}');

    Employee.findByIdAndDelete(req.params.id, (err,doc)  => {
        if(!err){res.send(doc);}
        else  { console.log('Error in Deleting Employee: ' + JSON.stringify(err, undefined, 2));}
    });

});

//post will be enabled in this node project so the local host 3000 can accept posts from the local host 4200 app
// 
// 
// 
// 
// 



module.exports = router;