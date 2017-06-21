"use strict";

let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();



app.use(express.static(__dirname + "/../client"));

app.get('/',(request,response) => {
console.log("we made it");
response.sendStatus(201);
});

app.listen(9999, () => console.log("Listening on 9999"));
