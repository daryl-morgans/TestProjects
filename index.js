/**
 * Created by daryl on 4/3/2016.
*/
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var data = [{"id":1,"content":"Hello, World!"},
    {"id":2,"content":"Test2"}];
var currentID = 2;

var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/todo',router);
app.use(express.static(__dirname + '/public'));
app.use("/lib/",express.static(__dirname + '/node_modules'));

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get("/", function (req,res) {
    res.json(data);
});

router.put("/", function (req,res) {
    currentID+=1;
    console.log(req.body);
    data.push({id:currentID,"content":req.body.content})
    res.json({id:currentID});
});

router.put("/:content_id", function (req,res) {
    data.find(function(items) {
        return items.id === +req.params.content_id;
    }).content = req.body.content;
    res.sendStatus(200);
});

app.get("/", function (req,res) {
        res.redirect('/index.html');
    }
);

app.listen(8888);
console.log("Started.");

