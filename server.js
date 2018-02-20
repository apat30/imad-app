//Importing certain pakages in the below 3 lines
var express = require('express');//To create web servers, listens on the port and handles HTTP connection
var morgan = require('morgan');//Output logs of server
var path = require('path');

var app = express();
app.use(morgan('combined'));

//URL Handlers. Text responders
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Article-one', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'Article-one.html'))
});

app.get('/Article-Two', function(req, res){
    res.send('Article Two requested and will be served.')
});

app.get('/Article-Three', function(req, res){
    res.send('Article Three requested and will be served.')
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
