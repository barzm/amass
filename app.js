var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('lodash');
var SAT = require('sat');
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
var newFood = []; 
var collisions = [];

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

		P.sat.r = P.size/2;
		var toDelete = testCollision(P);
		var foodToDelete = testEat(P); 
		// console.log("Foodtodelete",foodToDelete); 
		if(foodToDelete){
			socket.broadcast.emit('deleteFood',foodToDelete); 
			socket.emit('deleteFood',foodToDelete);
			socket.broadcast.emit('newFood',newFood); 
			socket.emit('newFood',newFood);
		}
		if (toDelete) {
			socket.broadcast.emit('delete', toDelete);
			socket.emit('delete', toDelete);
		}
		socket.emit('drawPlayers', players);
		socket.broadcast.emit('drawPlayers', players);

	})
	socket.on('newPlayer', function(player) {
		player = JSON.parse(player);
		player.size = 30;
		player.socketId = socket.id;
		if(!food.length){
			makeNom(50); 
		}
		socket.broadcast.emit('newPlayer', player);
		socket.emit('allPlayers', players);
		var playerCircle = new C(
			new V(player.center.x, player.center.y),
			25);
		player.sat = playerCircle;
		players[player.name] = player;
		var createdFood = makeNom(1);
		socket.emit('newFood', food)
		socket.broadcast.emit('newFood', food);

	});

	socket.on('disconnect', function() {
		_.forEach(players, function(user, key) {
			if (user.socketId === socket.id) {
				socket.emit('delete', user.name);
				socket.broadcast.emit('delete', user.name);
				delete players[user.name];
			}
		})
	})

})
module.exports = app;

function testCollision(currentUser) {
	var toDelete;
	_.forEach(players, function(otherUser, key) {
		if (!(currentUser.name === otherUser.name)) {
			var response = new SAT.Response();
			var collision = SAT.testCircleCircle(currentUser.sat, otherUser.sat, response);
			if (collision) {
				if (currentUser.size * 1.1 > otherUser.size) {
					currentUser.size += otherUser.size;
					delete players[otherUser.name];
					toDelete = otherUser.name;
				} else if (otherUser.size * 1.1 > currentUser.size) {
					otherUser.size += currentUser.size;
					delete players[currentUser.name];
					toDelete = currentUser.name;
				}
			}
		}

	})
	return toDelete || null;
}

function testEat(currentUser) {
	var toDelete; 
	var tempUser = currentUser;
	// tempUser.sat.r*=1.3;
	_.forEach(food,function(foodItem,key){
		var response = new SAT.Response();
		var collision = SAT.testCircleCircle(tempUser.sat, foodItem, response);
		if (collision) {
			food.splice(key,1);
			currentUser.size+=3; 
			makeNom();
			toDelete = foodItem;
		}
	})
	return toDelete;
}

function massToRadius(m) {
	// console.log('mass to radius' ,m);
	return Math.sqrt(m / Math.PI) * 5;
}

function makeNom(num) {
	newFood = [];
	num = num || 1;
	while (num > 0) {
		var tempFood = new C(
			new V(Math.floor(Math.random() * 2000), Math.floor(Math.random() * 2000)),
			5);
		food.push(tempFood);
		newFood.push(tempFood);
		num--;
	}
	return newFood; 
}