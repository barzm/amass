var $canvas = $("canvas");
var wrapper = document.getElementById('wrapper');
var tempCanvas = document.getElementById('blobCanvas');
var ctx = tempCanvas.getContext('2d');
var X, Y, W, H, mousex, mousey, midX, midY, offsetX = 0, offsetY = 0;

// Page management

$(window).on('load', function() {
	initGame();
	redraw();
})

window.onresize = function() {
	resetSize();
}

function initGame() {
	resetSize();
	window.scrollTo(midX, midY)
	$canvas.drawArc({
		fillStyle: '#00FF99',
		layer: 'true',
		name: 'circle1',
		x: midX,
		y: midY,
		radius: 50
	});
	$(window).on('mousemove', function(event) {
		mousex = event.pageX;
		mousey = event.pageY;
	})
}

function resetSize() {
	W = $(window).width() / 2;
	H = $(window).height() / 2;
	var height = $(window).height() * 10;
	var width = $(window).width() * 10;
	tempCanvas.width = width;
	tempCanvas.height = height;
	mousex = X = midX = Math.floor(width / 2);
	mousey = Y = midY = Math.floor(height / 2);
}

// movement and player creation

function move() {
	var diffX = Math.abs(X - mousex);
	var diffY = Math.abs(Y - mousey);
	var absDiff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	if (absDiff < 2) return;
	absDiff = absDiff > 300 ? 300 : absDiff;
	absDiff = absDiff < 150 ? 150 : absDiff;
	var moveX = absDiff * diffX / ((diffX + diffY) * 40);
	var moveY = absDiff * diffY / ((diffX + diffY) * 40);
	X = X > mousex ? X - moveX : X + moveX;
	Y = Y > mousey ? Y - moveY : Y + moveY;
	window.scrollTo(X - W, Y - H);
}

function redraw () {
	setInterval(function() {
		$canvas.clearCanvas();
		move();
		$canvas.drawArc({
			fillStyle: '#00FF99',
			layer: 'true',
			name: 'circle1',
			x: X || midX,
			y: Y || midY,
			radius: 50
		});
	}, 16.66667)
}

