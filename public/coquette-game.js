var $canvas = $("canvas");
var wrapper = document.getElementById('wrapper');
var tempCanvas = document.getElementById('blobCanvas');
var ctx = tempCanvas.getContext('2d');
var X, Y, W, H, currentPlayerPositions, globalHeight, globalWidth, mousex, mousey, midX, midY, offsetX = 0, offsetY = 0,gameSession;
// Page management

$(window).on('mousemove',function(event){
	mousex = event.pageX;
	mousey = event.pageY;
})

var Game = function() {
	this.c = new Coquette(this, "blobCanvas", globalHeight, globalWidth, "transparent");
	
};

var Blob = function(game, settings) {
	for (var i in settings) {
		this[i] = settings[i];
	}
	this.size = {
		x: 50,
		y: 50
	};
	this.draw = function (ctx) {
		ctx.beginPath();
		ctx.arc(this.center.x, this.center.y, this.size.x / 2, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.strokeStyle = "transparent";
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
	};
}


$(window).on('load', function() {
	initGame();
})

window.onresize = function() {
	resetSize();
}

function initGame() {
	resetSize();
	console.log('gameSession', gameSession);
	window.scrollTo(midX, midY)
	gameSession = gameSession || new Game();
	var name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
	addPlayer(name); 

}

function resetSize() {
	W = $(window).width() / 2;
	H = $(window).height() / 2;
	globalWidth = $(window).width() * 10;
	globalHeight = $(window).height() * 10;
	mousex = X = midX = Math.floor(globalWidth / 2);
	mousey = Y = midY = Math.floor(globalHeight / 2);
}
