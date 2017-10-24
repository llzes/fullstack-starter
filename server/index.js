// SERVER FILE
// This is an example if you were to use a PostgreSQL database!

'use strict';
const express=require('express');
const app=express();
const {DATABASE,PORT}=require('./config');
const bodyParser=require('body-parser');
const jsonParser=bodyParser.json();
app.use(express.static('public'));

// We will be using HTTP requests to GET and POST our database of favourite cheesecakes
// This is known as a RESTful API when you make GET, POST, PUT, and DELETE HTTP requests

// GET all cheesecake favourites from the cheesecake table
app.get('/DATABASE_TABLE_HERE',(req,res)=>{
    knex('DATABASE_TABLE_HERE')
        .orderBy('id')
        .then(results=>res.json(results));
});

// POST a new favourite cheesecake to the cheesecake table 
app.post('/DATABASE_TABLE_HERE',jsonParser,(req,res)=>{
    if(!(req.body.cheesecake)){
        res.status(400).send();
    }
    else{
        knex('DATABASE_TABLE_HERE').insert(req.body)
            .returning(['id','cheesecake'])
            .then(results=>res.json(results));
        }
});

// PUT updates an existing value of your choosing in your table
// In this example we'll use id to find said cheesecake
app.put('/DATABASE_TABLE_HERE/:id',jsonParser,(req,res)=>{
    if(!(req.body.cheesecake)){
        res.status(400).send();
    }
    else{
        knex('DATABASE_TABLE_HERE')
            .update('cheesecake',req.body.cheesecake)
            .where('id',req.params.id)
            .returning(['id','cheesecake'])
            .then(results=>res.status(201).json(results));
        }
});

// DELETE a cheesecake by the id!
app.delete('/DATABASE_TABLE_HERE/:id',(req,res)=>{
  knex('DATABASE_TABLE_HERE')
    .where('id',req.params.id)
    .then(results=>res.json(results));
});

let server;
let knex;
function runServer(database=DATABASE,port=PORT){
    return new Promise((resolve,reject)=>{
        try{
            knex=require('knex')(database);
            server=app.listen(port,()=>{
            console.info(`Our cheesecake app is listening on port ${server.address().port}`);
            resolve();
            });
        }
        catch (err){
            console.error(`Can't start the cheesecake server: ${err}`);
            reject(err);
        }
    });
}

function closeServer(){
    return knex.destroy().then(()=>{
        return new Promise((resolve, reject)=>{
            server.close(err=>{
                if(err){
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if(require.main===module){
    runServer().catch(err=>{
        console.error(`Uh oh, can't start our cheesecake server: ${err}`);
        throw err;
    });
}

module.exports={app,runServer,closeServer};