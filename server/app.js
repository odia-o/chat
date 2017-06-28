"use strict";

let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();


let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let username;

app.use(express.static(__dirname + "/../client"));

app.post("/", jsonParser, (request, response) => {
    username = request.body.username;
    
    response.sendStatus(201);
    
});

app.get('/home',(request,response) => {
//let contacts = ['tobi', 'timi'];
//let groups = [{name: "noise makers", members: ['kemi', 'jerry']}];
    if(!username){
        response.json({});
    }
let user = mongoUtil.users();
    user.find({name: username}).toArray((err, doc) => {
        if (err) {
            response.sendStatus(400);
        }
       
        let contactsNames = doc.map((u)=> {return u.contacts})[0] || [];
        let groupsNames = doc.map((u)=> {return u.groups})[0] || [];
        response.json({contactsNames: contactsNames, groupsNames: groupsNames});
    });    

//response.json({contacts: contacts, groups: groups});
});

app.get('/home/contact/:contactName', (request, response) => {
    
let contactName = request.params.contactName;
   let contact = mongoUtil.contacts();
    contact.find({name: contactName}).toArray((err, doc) => {
        if(err){
            response.sendStatus(400);
        }
        
        let messages = doc.map((u) => {return u.messages})[0] || [];
        
        response.json({messages: messages});
            
    });
    
    //response.json(messages);
});

app.post('/home/contact/:contactName', jsonParser, (request, response) => {
   let contactName = request.params.contactName;
   let message = request.body.message || '';
    

  if(!message){
    response.sendStatus(400);
  }

  let contact = mongoUtil.contacts();
  let query = {name: contactName};
  let update = {$push: {messages: {contactName:username, message: message}}};

  contact.findOneAndUpdate(query, update, (err, res) => {
    if(err){
      response.sendStatus(400);
    }
    response.sendStatus(201);
  });
    
//    console.log({contactName: contactName, message: message});
//    response.sendStatus(201);
});

app.get('/home/group/:groupName', (request, response) => {
    
let groupName = request.params.groupName;
   let group = mongoUtil.groups();
    group.find({name: groupName}).toArray((err, doc) => {
        if(err){
            response.sendStatus(400);
        }
        
        let messages = doc.map((u) => {return u.messages})[0] || [];
        
        response.json({messages: messages});
        
        //response.json(doc);
            
    });
    
    //response.json(messages);
});

app.post('/home/group/:groupName', jsonParser, (request, response) => {
   let groupName = request.params.groupName;
   let message = request.body.message || '';
    

  if(!message){
    response.sendStatus(400);
  }

  let group = mongoUtil.groups();
  let query = {name: groupName};
  let update = {$push: {messages: {contactName:username, message: message}}};

  group.findOneAndUpdate(query, update, (err, res) => {
    if(err){
      response.sendStatus(400);
    }
    response.sendStatus(201);
  });
    
//    console.log({groupName: groupName, message: message});
//    response.sendStatus(201);
});


app.listen(9999, () => console.log("Listening on 9999"));
