// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/public/dist/public' ));
// Setting our Views Folder Directory
//DATABASE/MONGOOSE
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/intro');

// Use native promises
mongoose.Promise = global.Promise;

//make schema
var CakeSchema = new mongoose.Schema({
    Baker:{type:String, default: ""},
    imgUrl: {type:String, default: ""},
    ratings: [Object]
},{timestamps:true});

var RatingSchema = new mongoose.Schema({
    comment: {type:String, default:""},
    score : {type:Number, default:5}
},{timestamps:true});

mongoose.model('Cake',TaskSchema);
mongoose.model('Rating',RatingSchema);

var Cake = mongoose.model('Cake');
var Rating = mongoose.model('Rating');

app.get('/cakes',(req,res) => {
    Cake.find({},function(err,cakes){
        if(err){
            console.log("error in find all cakes:",err);
            res.json({message: "ERROR",error : err});
        }
        else{
            res.json({message:"Success",data:cakes});
        }
    });
});

app.get('/cake/:cakeId',(req,res) =>{
    console.log("finding cake with id:", req.params.cakeId);
    Cake.findOne({_id:req.params.cakeId},function(err,cake){
        if(err){
            console.log("Returned error", err);
             // respond with JSON
            res.json({message: "Error", error: err})
        }
        else{
             // respond with JSON
             res.json({message: "Success", data: cake})
        }
    });
});

app.get('/ratings/:cakeId',(req,res) =>{
    
});