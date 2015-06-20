var socket = io.connect(window.location.href);


socket.on('drawPlayer', function (data) {
	// gameSession.c.
	console.log(gameSession.c.entitites._entities);
})

socket.on('newPlayer', function (player) {
	addPlayer(null, player);
})