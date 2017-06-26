"use strict";

let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();



app.use(express.static(__dirname + "/../client"));

app.get('/home',(request,response) => {
let contacts = ['tobi', 'timi'];
let groups = [{name: "noise makers", members: ['kemi', 'jerry']}];
response.json({contacts: contacts, groups: groups});
});

app.get('/home/:contactName', (request, response) => {
   let messages = [
       {
           name: 'tobi',
           msg: 'hi'
       },
       {
           name: 'mia',
           msg: 'wassup'
       }
   ];
    
    response.json(messages);
});

app.listen(9999, () => console.log("Listening on 9999"));
