var socket = io.connect(window.location.href);


socket.on('drawPlayers', function(serverPlayers) {
	currentPlayerPositions = serverPlayers;
})

socket.on('newPlayer', function(player) {
	player.broadcast = false;
	addPlayer(null, player);
})

socket.on('allPlayers', function(players) {
	if (players) {
		for (var id in players) {
			players[id].broadcast = false;
			addPlayer(null, players[id]);
		}
	}
})

socket.on('delete', function(name) {
	var users = gameSession.c.entities.all(Blob)
	for (var user in users) {
		if (users[user].name === name) {
			gameSession.c.entities.destroy(users[user]);
		}
	}
})

socket.on('newFood', function(food) {
	food.forEach(function(nom) {
		addNom(nom);
	});
})
socket.on('deleteFood', function(foodToDelete) {
	var gameFood = gameSession.c.entities.all(Nom);
	_.forEach(gameFood, function(cur) {
		if (cur.pos.x === foodToDelete.pos.x && cur.pos.y === foodToDelete.pos.y) {
			gameSession.c.entities.destroy(cur);
		}
	})
})

socket.on('FAILURE', function() {
	setTimeout(function() {
		location.reload()
	}, 1500);
})