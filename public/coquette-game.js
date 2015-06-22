var $canvas = $("canvas");
var wrapper = document.getElementById('wrapper');
var tempCanvas = document.getElementById('blobCanvas');
var ctx = tempCanvas.getContext('2d');
var X, Y, W, H, currentPlayerPositions, globalHeight, globalWidth, mousex, mousey, midX, midY, offsetX = 0, offsetY = 0,gameSession;

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
var Nom = function (game, nomGameObj){
	this.pos = {x:nomGameObj.pos.x,y:nomGameObj.pos.y};
	this.size = {x:10,y:10};

	this.draw = function(ctx){
		ctx.beginPath();
		ctx.arc(nomGameObj.pos.x, nomGameObj.pos.y, 7, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.strokeStyle = "transparent";
		ctx.fillStyle = nomGameObj.color; 
		ctx.fill();
		ctx.stroke();
	}
}
$(window).on('load', function() {
	initGame();
})

window.onresize = function() {
	resetSize();
}
function initGame() {
	resetSize();
	window.scrollTo(midX, midY)
	gameSession =  new Game();
	var name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
	addPlayer(name); 
}
function resetSize() {
	W = $(window).width() / 2;
	H = $(window).height() / 2;
	globalWidth = 5000;
	globalHeight = 5000;
	mousex = X = midX = Math.floor(globalWidth / 2);
	mousey = Y = midY = Math.floor(globalHeight / 2);
}

function addNom(nomObj){

	nomObj.color = getRandomColor();
	gameSession.c.entities.create(Nom,nomObj); 
}
