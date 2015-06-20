var colors = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#E74C3C','#F1C40F'];
function addPlayer(name){
	var self = gameSession;
	self.c.entities.create(Blob, {
		center: {
			x: midX/2,
			y: midY
		},
		color: getRandomColor(),
		update: function() {
			var mouse = self.c.inputter.getMousePosition() || {x: 0, y: 0};
			var diffX = Math.abs(this.center.x - mouse.x);
			var diffY = Math.abs(this.center.y - mouse.y);
			var absDiff = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
			if (absDiff < 2) return;
			absDiff = absDiff > 300 ? 300 : absDiff;
			absDiff = absDiff < 150 ? 150 : absDiff;
			var moveX = absDiff * diffX / ((diffX + diffY) * 40);
			var moveY = absDiff * diffY / ((diffX + diffY) * 40);
			this.center.x = this.center.x > mouse.x ? this.center.x - moveX : this.center.x + moveX;
			this.center.y = this.center.y > mouse.y ? this.center.y - moveY : this.center.y + moveY;
			window.scrollTo(this.center.x - W, this.center.y - H);
			$canvas.clearCanvas();
		},

		collision: function(other) {
			// other.center.y = this.center.y; // follow the player
		}	
	});
}

function getRandomColor(){
	return colors[Math.floor(Math.random()*6)];
}

