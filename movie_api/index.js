const express = require("express");
const request = require('request');
const rp = require('request-promise');
const app = express();
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("search");
})

app.get('/results', (req, res) => {
    var query = req.query.search;
    var options = {
        uri: `http://www.omdbapi.com/?s=${query}&apikey=thewdb`,
        json: true
        };

    rp(options)
        .then((htmlstring) => {
            const api = (htmlstring);
        // res.send(api.Search[1].Title);
        res.render("results", {api: api});
})
.catch((err) => {
    console.log("error!", err);
});
});
  

app.listen(3000, function(){
    console.log("movie app has started on 3000");
})