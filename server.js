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

app.use(express.static( __dirname + '/static/'));
// Setting our Views Folder Directory
//DATABASE/MONGOOSE
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/intro');

// Use native promises
mongoose.Promise = global.Promise;

//make schema//MAKE SURE DEPENDENT MODELS ARE BELOW
var RatingSchema = new mongoose.Schema({
    comment: {type:String, default:""},
    score : {type:Number, default:5}
},{timestamps:true});

var CakeSchema = new mongoose.Schema({
    baker:{type:String, default: ""},
    imgUrl: {type:String, default: ""},
    ratings: [RatingSchema]
},{timestamps:true});

mongoose.model('Cake',CakeSchema);
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

// app.get('/ratings/:cakeId',(req,res) =>{
//     console.log("finding ratings associated with cake id of:",req.params.cakeId);
//     Rating.find({})
// });

app.post('/cakes',(req,res) =>{
    console.log("POST Cake: ",req.body);
    var cake = new Cake({baker: req.body.baker, imgUrl : req.body.imgUrl, ratings:[]});
    cake.save(function(saveError){
        if(saveError){
            console.log("could not save cake:",saveError);
            res.json({"Success" : "saveError"});
        }
        else{
            console.log("saved Cake in DB");
            res.json(cake);
        }
    });
});

app.post('/rating/:cakeId',(req,res) =>{
    console.log("POST rating: ",req.body);
    console.log("rating Cake with ID:",req.params.cakeId);
    var rating = new Rating({comment:req.body.comment,score:req.body.score});
    rating.save(function(saveError){
        if(saveError){
            console.log("could not save rating:",saveError);
            res.json({"Success" : "saveErrorRating"});
        }
        else{
            console.log("saved Rating in DB:",rating);
            //res.json(rating);
            Cake.findOne({_id:req.params.cakeId},function(err,cake){
                if(err){
                    console.log("could not find cake:",err);
                    res.json({"Success" : "saveErrorCake"})
                }
                else if(cake == null){
                    console.log("could not find a cake with that ID");
                    res.json({"Success" : "bad_cake_id"});
                }
                else{
                    console.log("found this cake: ",cake);
                    console.log("adding rating:",rating);
                    cake.ratings.push(rating);
                    cake.save(function(saveError){
                        if(saveError){
                            console.log("could not save final cake while rating:",saveError);
                            res.j
                            res.json({Success:"saveError"})
                        }
                        else{
                            console.log("saved cake with rating:",cake,rating);
                            res.json(cake);
                        }
                    });
                    
                }
            });
        }
    });
});

app.listen(9000, function() {
    console.log("listening on port 9000");
})