var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

// Body Parser Middleware
//return json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//returns string text
app.use(bodyParser.text());
//sets the type 
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(express.static("app/public"));


require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);




app.listen(port, () => console.log("Listening on Port %s", port));

