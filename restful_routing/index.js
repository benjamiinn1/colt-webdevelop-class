// APP CONFIG
var express = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://designshack.net/wp-content/uploads/placeholder-image.png"},
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     body: "HELLO THIS IS A BLOG POST"
// });

// RESTFUL ROUTES
app.listen(3000, function(){
    console.log("Server is running");
});

app.get("/", function(req, res){
    res.redirect("/blogs");
});

// index route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs});
        }
    });
});

// new route
app.get("/blogs/new", function(req, res){
    res.render("new");
});
// create route
app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    });
});

// show route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundblogs){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundblogs});
        }
    })
});