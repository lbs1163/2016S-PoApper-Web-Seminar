var c;
var ctx;

var length;
var headX;
var headY;

var dir;

var map = [];

for(var i=0; i<10; i++) {
	var temp = [];

	for(var j=0; j<10; j++) {
		temp.push(0);
	}

	map.push(temp);
}

function drawSquare (x, y) {
	ctx.fillStyle = "black";
	ctx.fillRect(x * 70 + 10, y * 70 + 10, 50, 50);
}

function drawGame () {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 700, 700);

	for(var i=0; i<10; i++)
		for(var j=0; j<10; j++)
			if(map[i][j] != 0)
				drawSquare(i, j);
}

function initGame() {
	length = 1;
	headX = 5;
	headY = 5;
	dir = "up";
}

function frame() {
	for(var i=0; i<10; i++)
		for(var j=0; j<10; j++)
			if(map[i][j] != 0)
				map[i][j]--;

	if(dir == "up" && headY > 0)
		headY--;
	else if(dir == "down" && headY < 9)
		headY++;
	else if(dir == "left" && headX > 0)
		headX--;
	else if(dir == "right" && headX < 9)
		headX++;

	map[headX][headY] = length;

	drawGame();
}

function control(evt) {
	var key = evt.keyCode;

	if(key == 37)
		dir = "left";
	else if(key == 38)
		dir = "up";
	else if(key == 39)
		dir = "right";
	else if(key == 40)
		dir = "down";
}

window.onload = function() {
	c = document.getElementById("snake");
	ctx = c.getContext("2d");

	initGame();
}

document.addEventListener("keydown", control);
setInterval(frame, 100);