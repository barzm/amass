var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('lodash');
var SAT = require('sat'); 
// console.log(SAT);
// var livereload = require('livereload');
// lrserver = livereload.createServer();
// lrserver.watch('.');
server.listen(1337);
app.use(express.static('bower_components'));
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/public/index.html');
})
var V = SAT.Vector;
var C = SAT.Circle;
var players = {};
var food = [];
var collisions=[];

io.on('connection', function(socket) {
	socket.on('playerMove', function(data) {
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
		P.sat.pos.x = P.center.x;
		P.sat.pos.y = P.center.y;
		
		P.sat.r =  massToRadius(P.size);
		testCollision(P);
		socket.emit('drawPlayers', players);
		socket.broadcast.emit('drawPlayers', players);
	})
	socket.on('newPlayer', function(player) {
		player = JSON.parse(player);
		player.size = Math.floor(Math.random()*100);
		socket.broadcast.emit('newPlayer', player);
		socket.emit('allPlayers', players);
		// player.sat = new SAT.circle(new SAT.V(player.center.x,player.center.y),25);
		var playerCircle = new C(
			new V(player.center.x, player.center.y),
			25);
		player.sat = playerCircle;
		players[player.name] = player;
	});

})
module.exports = app;

function testCollision(currentUser){
	_.forEach(players,function(value,key){
		if(!(currentUser.name === value.name)){
			var response = new SAT.Response();
			var collision =SAT.testCircleCircle(currentUser.sat,value.sat,response);
			if(collision){
				console.log(currentUser.size>value.size ? currentUser.name:value.name);
				console.log('Collisision response   !!!!' , response);
			}
		}

	})
}
function massToRadius(m){
	return Math.sqrt(m/Math.PI);
}

function makeNom() {
	food.push({
		x: Math.floor(Math.random() * 2000),
		y: Math.floor(Math.random() * 2000)
	});
}