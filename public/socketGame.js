var socket = io.connect(window.location.href);


socket.on('drawPlayers', function (serverPlayers) {
	currentPlayerPositions = serverPlayers;
})

socket.on('newPlayer', function (player) {
	console.log("newPlayer heard", player);
	player.broadcast = false;
	addPlayer(null, player);
})

socket.on('allPlayers', function (players) {
	console.log('receiving all players',players);
	if (players) {
		for (var player in players) {
			console.log(player);
			player.broadcast = false;
			addPlayer(null, player);
		}
	}
})
