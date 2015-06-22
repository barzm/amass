var express= require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('lodash');
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
var players = {};
var food = [];
io.on('connection',function(socket){
	socket.on('playerMove', function (data) {
		var P = players[data.name];
		var diffX = Math.abs(P.center.x - data.mouse.x);
		var diffY = Math.abs(P.center.y - data.mouse.y);
		var absDiff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
		if (absDiff < 5) return;
		absDiff = absDiff > 300 ? 300 : absDiff;
		absDiff = absDiff < 150 ? 150 : absDiff;
		var moveX = absDiff * diffX / ((diffX + diffY) * 40);
		var moveY = absDiff * diffY / ((diffX + diffY) * 40);
		P.center.x = P.center.x > data.mouse.x ? P.center.x - moveX : P.center.x + moveX;
		P.center.y = P.center.y > data.mouse.y ? P.center.y - moveY : P.center.y + moveY;
		players[data.name].x = data.x;
		players[data.name].y = data.y;
		socket.emit('drawPlayers', players);
		socket.broadcast.emit('drawPlayers', players);
	})
	socket.on('newPlayer', function (player) {
		player = JSON.parse(player);
		socket.broadcast.emit('newPlayer', player);
		socket.emit('allPlayers', players);
		players[player.name] = player;
	})
})
module.exports = app;