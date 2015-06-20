var $canvas = $("canvas");
var wrapper = document.getElementById('wrapper');
var tempCanvas = document.getElementById('blobCanvas');
var ctx = tempCanvas.getContext('2d');
var X, Y, W, H, globalHeight, globalWidth, mousex, mousey, midX, midY, offsetX = 0, offsetY = 0,gameSession;
// Page management

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
	console.log(gameSession);
	window.scrollTo(midX, midY)
	gameSession = gameSession || new Game();
	addPlayer("my name"); 

}

function resetSize() {
	W = $(window).width() / 2;
	H = $(window).height() / 2;
	globalWidth = $(window).width() * 10;
	globalHeight = $(window).height() * 10;
	mousex = X = midX = Math.floor(globalWidth / 2);
	mousey = Y = midY = Math.floor(globalHeight / 2);
}

// movement and player creation

// function move() {
// 	var diffX = Math.abs(X - mousex);
// 	var diffY = Math.abs(Y - mousey);
// 	var absDiff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
// 	if (absDiff < 2) return;
// 	absDiff = absDiff > 300 ? 300 : absDiff;
// 	absDiff = absDiff < 150 ? 150 : absDiff;
// 	var moveX = absDiff * diffX / ((diffX + diffY) * 40);
// 	var moveY = absDiff * diffY / ((diffX + diffY) * 40);
// 	X = X > mousex ? X - moveX : X + moveX;
// 	Y = Y > mousey ? Y - moveY : Y + moveY;
// 	window.scrollTo(X - W, Y - H);
// }

// function redraw() {
// 	setInterval(function() {
// 		$canvas.clearCanvas();
// 		move();
// 		$canvas.drawArc({
// 			fillStyle: '#00FF99',
// 			layer: 'true',
// 			name: 'circle1',
// 			x: X || midX,
// 			y: Y || midY,
// 			radius: 50
// 		});
// 	}, 16.66667)
// }