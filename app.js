var express= require('express'); 
var app = express(); 
var server = require('http').Server(app); 
var io = require('socket.io')(server); 
// var livereload = require('livereload'); 
// lrserver = livereload.createServer();
// lrserver.watch('.'); 
server.listen(1337); 
app.use(express.static('bower_components'));
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.get('/',function(req,res,next){
	res.sendFile(__dirname+ '/public/index.html'); 
})


io.on('connection',function(socket){
	console.log('socket connected');
	socket.on('playerMove', function (data) {
		socket.broadcast.emit('drawPlayer', data);
	})
	socket.on('newPlayer', function (player) {
		console.log("New Player!");
		socket.broadcast.emit('newPlayer', player);
	})
})



module.exports = app;
