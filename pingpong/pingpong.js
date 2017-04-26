var radius = 10;
var bar = 200;
var scoreboard = 200;
var speed = 10;
var winscore = 3;

var playerA;
var playerB;

var ballX;
var ballY;

var ballSpeedX;
var ballSpeedY;

var Aspeed;
var Bspeed;

var scoreA;
var scoreB;

var gameState;

var c;
var ctx;

function initGame() {
	gameState = "main";

	playerA = 350;
	playerB = 350;

	ballX = 700;
	ballY = 350;

	ballSpeedX = Math.floor(Math.sqrt(Math.random() * speed * speed));
	ballSpeedY = Math.floor(Math.sqrt(speed * speed - ballSpeedX * ballSpeedX));
	
	if(Math.random() < 0.5)
		ballSpeedX = -ballSpeedX;
	if(Math.random() < 0.5)
		ballSpeedY = -ballSpeedY;

	Aspeed = 0;
	Bspeed = 0;
}

function init() {
	scoreA = 0;
	scoreB = 0;

	initGame();
}

function drawScore() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 1400, 200);
	ctx.fillStyle = "black";
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(scoreA + ' : ' + scoreB, 700, scoreboard/2);
}

function drawBall() {
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(ballX, ballY + scoreboard, radius, 0, 2 * Math.PI, false);
	ctx.fill();
}

function drawBar() {
	ctx.fillStyle = "white";
	ctx.fillRect(100, playerA - bar/2 + scoreboard, 30, bar);
	ctx.fillRect(1300 - 30, playerB - bar/2 + scoreboard, 30, bar);
}

function drawMain() {
	drawScore();
	ctx.fillStyle = "black";
	ctx.fillRect(0, scoreboard, 1400, 700);
	drawBall();
	drawBar();
	ctx.fillStyle = "white";
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Press Spacebar to Begin", 700, 750);
}

function drawGame() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1400, 700 + scoreboard);
	drawScore();
	ctx.fillStyle = "black";
	ctx.fillRect(0, scoreboard, 1400, 700);
	drawBall();
	drawBar();
}

function drawOver() {
	drawScore();

	ctx.fillStyle = "white";
	ctx.font = "100px Arial";
	ctx.textAlign = "center";
	var player;	

	if(playerA == winscore)
		player = 'A';
	else
		player = 'B';
	ctx.fillText('Player ' + player + ' Win!', 700, 750);
}

function draw() {
	if(gameState == "main")
		drawMain();
	else if(gameState == "game")
		drawGame();
	else if(gameState == "over")
		drawOver();
}

function frame() {
	if(gameState == "game") {
		ballX += ballSpeedX;
		ballY += ballSpeedY;

		playerA += Aspeed;
		playerB += Bspeed;

		if(playerA - bar/2 < 0)
			playerA = bar/2;
		else if(playerA + bar/2 > 700)
			playerA = 700 - bar/2;

		if(playerB - bar/2 < 0)
			playerB = bar/2;
		else if(playerB + bar/2 > 700)
			playerB = 700 - bar/2;

		if((ballX - radius) <= 0) {
			scoreB++;
			if(scoreB == winscore)
				gameState = "over";
			else
				initGame();
		}
		else if((ballX + radius) >= 1400) {
			scoreA++;
			if(scoreA == winscore)
				gameState = "over";
			else
				initGame();
		}
		else if((ballY - radius) <= 0) {
			ballSpeedY = -ballSpeedY;
		}
		else if((ballY + radius) >= 700) {
			ballSpeedY = -ballSpeedY;
		}
		if(playerA - bar/2 < ballY && ballY < playerA + bar/2) {
			if(100 < ballX - radius && ballX - radius < 130)
				ballSpeedX = -ballSpeedX;
		}
		if(playerB - bar/2 < ballY && ballY < playerB + bar/2) {
			if(1270 < ballX + radius && ballX + radius < 1300)
				ballSpeedX = -ballSpeedX;
		}
	}

	draw();
}

function controldown(evt) {
	var key = evt.keyCode;

	//alert(key);

	if(key == 32) {
		if(gameState == "main")
			gameState = "game";
		else if(gameState == "over")
			init();
	}
	else if(key == 87) { //w
		Aspeed = -speed;
	}
	else if(key == 83) { //s
		Aspeed = speed;
	}
	else if(key == 38) { //up
		Bspeed = -speed;
	}
	else if(key == 40) { //down
		Bspeed = speed;
	}
}

function controlup(evt) {
	var key = evt.keyCode;

	//alert(key);

	if(key == 87) { //w
		Aspeed = 0;
	}
	else if(key == 83) { //s
		Aspeed = 0;
	}
	else if(key == 38) { //up
		Bspeed = 0;
	}
	else if(key == 40) { //down
		Bspeed = 0;
	}
}

window.onload = function() {
	c = document.getElementById("pingpong");
	ctx = c.getContext("2d");

	init();
}

document.addEventListener("keydown", controldown);
document.addEventListener("keyup", controlup);
setInterval(frame, 10);