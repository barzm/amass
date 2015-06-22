var colors = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#E74C3C','#F1C40F'];
function addPlayer (name, config) {
	var settings = {
		boundingBox: gameSession.c.collider.CIRCLE,
		angle:0,
		update: function () {

			$canvas.clearCanvas();
			this.center = getServerPosition(this.name);
			this.size = getServerSize(this.name);
			if (!config) {
				socket.emit('playerMove', {name: this.name, mouse: {x: mousex,y: mousey}})
				window.scrollTo(this.center.x - W, this.center.y - H)
			}
		}
	};

	if (config) {
		for (var key in config) {
			settings[key] = config[key];
		}
		settings.broadcast = false;
	} else {
		settings.broadcast = true;
		settings.name = name;
		settings.center = {
			x: midX/2+Math.random()*200,
			y: midY+Math.random()*200
		};
		settings.color = getRandomColor();
	}

	var newPlayer = gameSession.c.entities.create(Blob, settings);

	if (newPlayer.broadcast) 
		socket.emit('newPlayer', JSON.stringify(newPlayer));
}

function getRandomColor(){
	return colors[Math.floor(Math.random()*6)];
}

function getServerPosition (name) {
	if (!currentPlayerPositions || !currentPlayerPositions[name]) {
		return {
			x: midX/2,
			y: midY
		}
	}
	return {
		x: currentPlayerPositions[name].center.x,
		y: currentPlayerPositions[name].center.y
	}
}

function getServerSize (name) {
	if (!currentPlayerPositions || !currentPlayerPositions[name]) {
		return {
			x: 50,
			y: 50
		}
	}
	return {
		x: currentPlayerPositions[name].size,
		y: currentPlayerPositions[name].size
	}
}
