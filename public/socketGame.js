var socket = io.connect(window.location.href);


socket.on('drawPlayers', function (serverPlayers) {
	currentPlayerPositions = serverPlayers;
})

socket.on('newPlayer', function (player) {
	player.broadcast = false;
	addPlayer(null, player);
})

socket.on('allPlayers', function (players) {
	console.log('receiving all plalyers fuck ',players);
	if (players) {
		for (var player in players) {
			player.broadcast = false;
			addPlayer(null, player);
		}
	}
})