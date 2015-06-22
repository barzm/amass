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