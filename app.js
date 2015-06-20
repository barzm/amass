var express = require('express');
var app = express();
// var path= require('path'); 
var livereload = require('livereload'); 
server = livereload.createServer();
server.watch('.'); 
module.exports = app;


app.use(express.static('bower_components'));
app.use(express.static('node_modules'));

app.use(express.static('public'));
app.get('/',function(req,res,next){
	res.sendFile(__dirname+ '/public/index.html'); 
})

app.listen(1337,function(){
	console.log("Listening on port 1337"); 
}); 