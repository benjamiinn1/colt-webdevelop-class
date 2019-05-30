var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://images.unsplash.com/photo-1539146395724-de109483bdd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1115&q=80",
//     description: "This is a huge granite hill, no bathrooms. no water. Beautiful granite"
// }, function(err, campground){
//     if(err){
//         HTMLFormControlsCollection.log(err);
//     } else{
//         console.log("newly created campground: ");
//         console.log(campground);
//     }
// });

app.use(express.static(__dirname + '/public/css'));

app.get("/", function(req, res){
    res.render("landing");
});


// INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res){ 
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
    // res.render("campgrounds", {campgrounds: campgrounds});
})

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// CREATE - create new campground
app.post("/campgrounds", function(req, res){
    
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var descr = req.body.description;
    var newCampground = {name: name, image: image, description: descr};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
    // redirect back to campgrounds page
});

// SHOW shows info about one campground
app.get("/campgrounds/:id", function(req, res){
    // find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
    // render show template with that campground
});

app.listen(3000, function(){
    console.log("yelp camp has started on port 3000");
});