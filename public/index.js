console.log('Page working properly');
var $canvas = $("canvas");
var state = []; //contains all shapes in a given state
var mousex,mousey; 

var tempCanvas = document.getElementById('blobCanvas');
var midX,midY; 
function resetSize(){
	var height = $(window).height();
	var width = $(window).width()
	tempCanvas.width=width; 
	tempCanvas.height=height;
	midX = Math.floor(width/2); 
	midY = Math.floor(height/2); 
}

function initGame(){
	resetSize(); 
	$canvas.drawArc({
		fillStyle: '#00FF99',
		layer:'true',
		name:'circle1',
		x: midX, y: midY,
		radius:50
	});
	$(window).on('mousemove',function(event){
		// console.log('x: ',event.pageX, " y: ",event.pageY);
		mousex = event.pageX;
		mousey = event.pageY; 
	})
}
function redraw(){
	setInterval(function(){
		$canvas.clearCanvas();
		$canvas.drawArc({
			fillStyle: '#00FF99',
			layer:'true',
			name:'circle1',
			x: mousex||midX, y: mousey||midY,
			radius:50
		});
	},17)
}

$(window).on('load',function(){
	initGame();
	redraw(); 
})
window.onresize=function(){
	resetSize(); 
}