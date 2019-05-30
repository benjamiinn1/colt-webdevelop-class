var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/liking/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("like", {thingVar: thing});
})

app.get("/posts", function(req, res){
    var posts = [
        {title: "post 1", author: "tim"},
        {title: "post 2", author: "jon"},
        {title: "post 3", author: "rob"},
        {title: "post 4", author: "pat"},
    ];
    res.render("posts", {posts: posts});
})

app.listen(3000, function(){
    console.log("running on 3000");
})