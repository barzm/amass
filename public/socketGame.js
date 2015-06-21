var socket = io.connect(window.location.href);


socket.on('drawPlayers', function (serverPlayers) {
	currentPlayerPositions = serverPlayers;
})

socket.on('newPlayer', function (player) {
	console.log('Client receiving new player: ', player);
	console.log(gameSession.c.entities.all());
	player.broadcast = false;
	addPlayer(null, player);
})

socket.on('allPlayers', function (players) {
	if (players) {
		for (var player in players) {
			addPlayer(null, player);
		}
	}
})