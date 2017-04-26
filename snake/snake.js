var c;
var cxt;

var gameTitle;
var gameStart;
var gameOver;

var dir;

var gameColor = "#000000";

var map;

var headX, headY;
var length;

function drawSquare(x, y) {
	ctx.fillStyle = "#000000";
	var x1 = (x * 14) + 2;
	var y1 = (y * 14) + 2;
	ctx.fillRect(x1, y1, 10, 10);
}

function drawStartScreen () {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 700, 700);

	ctx.fillStyle = "#000000";
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Snake Game", 350, 200);
	ctx.font = "50px Arial";
	ctx.fillText("Press Enter to Start", 350, 500);
}

function drawGameScreen () {
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 700, 700);

	ctx.fillStyle = "#000000";

	for(var i=0; i<50; i++) {
		for(var j=0; j<50; j++) {
			if(map[i][j] != 0) {
				drawSquare(i, j);
			}
		}
	}		
}

function drawOverScreen () {
	ctx.fillStyle = "#000000";
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Game Over", 350, 200);
	ctx.font = "50px Arial";
	ctx.fillText("Press Enter to Restart", 350, 500);
}

window.onload = function () {
	c = document.getElementById("snake");
	ctx = c.getContext("2d");

	gameTitle = true;
	gameStart = false;
	gameOver = false;

	dir = "up";

	map = [];

	for(var i=0; i<50; i++)
	{
		map.push([]);

		for(var j=0; j<50; j++)
		{
			map[i].push(0);
		}
	}
}

function makePrey () {
	do {
		var x = Math.floor(Math.random() * 50);
		var y = Math.floor(Math.random() * 50);
	} while(map[x][y] != 0)

	map[x][y] = -1;
}

function startGame () {
	gameTitle = false;
	gameStart = true;
	gameOver = false;

	headX = 24;
	headY = 24;

	for(var i=0; i<50; i++)
		for(var j=0; j<50; j++)
			map[i][j] = 0;

	map[headX][headY] = 1;
	length = 10;

	makePrey();
}

function keyInterrupt (evt) {
	var key = evt.keyCode;

	if(key == 37) {
		if(dir != "right")
			dir = "left";
	}
	else if(key == 38) {
		if(dir != "down")
			dir = "up";
	}
	else if(key == 39) {
		if(dir != "left")
			dir = "right";
	}
	else if(key == 40) {
		if(dir != "up")
			dir = "down";
	}
	else if(key == 13) {
		if(!gameStart)
			startGame();
	}
}

function drawScreen () {
	if(gameTitle)
		drawStartScreen();
	else if(gameStart)
		drawGameScreen();
	else if(gameOver)
		drawOverScreen();
}

function frame () {
	if(gameStart) {
		for(var i=0; i<50; i++)
			for(var j=0; j<50; j++)
				if (map[i][j] > 0)
					map[i][j]--;

		if(dir == "left")
			headX--;
		else if(dir == "up")
			headY--;
		else if(dir == "right")
			headX++;
		else if(dir == "down")
			headY++;

		if (headX < 0 || headY < 0 || headX >= 50 || headY >= 50)
		{
			gameTitle = false;
			gameStart = false;
			gameOver = true;
		}
		else if (map[headX][headY] > 0)
		{
			gameTitle = false;
			gameStart = false;
			gameOver = true;
		}
		else if(map[headX][headY] < 0)
		{
			length++;
			map[headX][headY] = length;
			makePrey();
		}
		else
		{
			map[headX][headY] = length;
		}
	}
	
	drawScreen();
}

document.addEventListener("keydown", keyInterrupt);
setInterval(frame, 100);
