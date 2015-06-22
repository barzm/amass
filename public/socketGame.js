var socket = io.connect(window.location.href);


socket.on('drawPlayers', function (serverPlayers) {
	currentPlayerPositions = serverPlayers;
})

socket.on('newPlayer', function (player) {
	player.broadcast = false;
	addPlayer(null, player);
})

socket.on('allPlayers', function (players) {
	if (players) {
		for (var id in players) {
			players[id].broadcast = false;
			addPlayer(null, players[id]);
		}
	}
})

socket.on('delete', function (name) {
	var users = gameSession.c.entities.all()
	for (var user in users) {
		if (users[user].name === name) {
			gameSession.c.entities.destroy(users[user]);
		}
	}
})

socket.on('newFood', function(food){
	food.forEach(function(nom){
		addNom(nom);
	});
})
socket.on('deleteFood',function(foodToDelete){
	console.log("sadflkjasdf");
	var gameFood = gameSession.c.entities.all(Nom);
	console.log('gameFood',gameFood);
	_.forEach(gameFood,function(cur){
		console.log('cur', cur);
		if(cur.pos.x === foodToDelete.pos.x && cur.pos.y === foodToDelete.pos.y){
			console.log("Found nom to delete ");
			gameSession.c.entities.destroy(cur);
		}
	})
})