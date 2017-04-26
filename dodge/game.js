window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, true);
window.addEventListener("keyup", onkeyup, true);

var GAME_STATE_READY = 0;
var GAME_STATE_GAME = 1;
var GAME_STATE_OVER = 2;

var GameState = GAME_STATE_READY;

var intervalID;
var intervalID2;

var arrMissiles = new Array();

var imgBackground = new Image();
imgBackground.src = "./background.jpg";
imgBackground.addEventListener("load", drawScreen, false);

var imgPlayer = new Image();
imgPlayer.src = "./player.gif"
imgPlayer.addEventListener("load", drawScreen, false);

var imgMissile = new Image();
imgMissile.src = "./missile.gif";

var intPlayerX = 400;
var intPlayerY = 300;

var xspeed = 0;
var yspeed = 0;

var intTime = 0;

function drawScreen()
{
	var theCanvas = document.getElementById("dodge");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "#000000";
	Context.fillRect(0, 0, 800, 600);

	Context.drawImage(imgBackground, 0, 0);
	Context.drawImage(imgPlayer, intPlayerX - 16, intPlayerY - 16);

	Context.fillStyle = "#ffffff";
	Context.font = '50px Arial';
	Context.textBaseline = "top";
	Context.textAlign = 'center';

	if(GameState == GAME_STATE_READY)
		Context.fillText("READY", 400, 180);
	else if(GameState == GAME_STATE_GAME)
	{
		for(var i=0; i<arrMissiles.length; i++)
			Context.drawImage(imgMissile, arrMissiles[i].x - 5, arrMissiles[i].y - 5);

		Context.font = '20px Arial';
		Context.textAlign = "left";
		Context.fillText("Time : " + (intTime / 1000), 10, 10);
	}
	else if(GameState == GAME_STATE_OVER)
	{
		for(var i=0; i<arrMissiles.length; i++)
			Context.drawImage(imgMissile, arrMissiles[i].x - 5, arrMissiles[i].y - 5);

		Context.fillText("GAME OVER", 400, 180);

		Context.font = '40px Arial';
		Context.textAlign = 'center';
		Context.fillText("Record : " + (intTime / 1000) + " seconds", 400, 280);
	}
}

function onkeydown(e)
{
	if(GameState == GAME_STATE_READY)
	{
		if(e.keyCode == 13)
			onGameStart();
	}
	else if(GameState == GAME_STATE_GAME)
	{
		switch(e.keyCode)
		{

		case 37:
			xspeed = -5;
			break;

		case 39:
			xspeed = +5;
			break;

		case 38:
			yspeed = -5;
			break;

		case 40:
			yspeed = +5;
			break;
		};
	}
	else if(GameState == GAME_STATE_OVER)
	{
		if(e.keyCode == 13)
			onReady();
	}

	drawScreen();
}

function onkeyup(e)
{
	if(GameState == GAME_STATE_GAME)
	{
		switch(e.keyCode)
		{
			case 37:
			case 39:
				xspeed = 0;
			break;

			case 38:
			case 40:
				yspeed = 0;
			break;
		}
	}
}

function RandomNextInt(max) {
	return 1 + Math.floor(Math.random() * max);
}

function onGameStart()
{
	GameState = GAME_STATE_GAME;
	intervalID = setInterval(InGameUpdate, 50);
	intervalID2 = setInterval(timer, 1);

	for(var i=0; i<50; i++)
	{
		var MissileType = RandomNextInt(4);
		var intX, intY, intGoX, intGoY;

		switch(MissileType)
		{
			case 1:
			intX = 0;
			intY = RandomNextInt(600);
			intGoX = RandomNextInt(2);
			intGoY = -2 + RandomNextInt(4);
			break;

			case 2:
			intX = 800;
			intY = RandomNextInt(600);
			intGoX = -RandomNextInt(2);
			intGoY = -2 + RandomNextInt(4);
			break;

			case 3:
			intX = RandomNextInt(800);
			intY = 0
			intGoX = -2 + RandomNextInt(4);
			intGoY = RandomNextInt(2);
			break;

			case 4:
			intX = RandomNextInt(800);
			intY = 600;
			intGoX = -2 + RandomNextInt(4);
			intGoY = -RandomNextInt(2);
			break;
		};

		arrMissiles.push( {x: intX, y: intY, go_x: intGoX, go_y: intGoY} );
	}
}

function onGameOver()
{
	GameState = GAME_STATE_OVER;
	clearInterval(intervalID);
	clearInterval(intervalID2);
}

function onReady()
{
	GameState = GAME_STATE_READY;

	intTime = 0;

	intPlayerX = 400;
	intPlayerY = 300;

	xspeed = 0;
	yspeed = 0;

	while(arrMissiles.length != 0)
		arrMissiles.pop();
}

function timer()
{
	intTime++;
}

function InGameUpdate()
{
	if(intTime % 5000 == 0)
	{
		for(var i=0; i<5; i++)
		{
			var MissileType = RandomNextInt(4);
			var intX, intY, intGoX, intGoY;

			switch(MissileType)
			{
				case 1:
				intX = 0;
				intY = RandomNextInt(600);
				intGoX = RandomNextInt(2);
				intGoY = -2 + RandomNextInt(4);
				break;

				case 2:
				intX = 800;
				intY = RandomNextInt(600);
				intGoX = -RandomNextInt(2);
				intGoY = -2 + RandomNextInt(4);
				break;

				case 3:
				intX = RandomNextInt(800);
				intY = 0
				intGoX = -2 + RandomNextInt(4);
				intGoY = RandomNextInt(2);
				break;

				case 4:
				intX = RandomNextInt(800);
				intY = 600;
				intGoX = -2 + RandomNextInt(4);
				intGoY = -RandomNextInt(2);
				break;
			};

			arrMissiles.push( {x: intX, y: intY, go_x: intGoX, go_y: intGoY} );
		}
	}

	MoveMissile();

	intPlayerX += xspeed;
	intPlayerY += yspeed;

	if(intPlayerX < 0)
		intPlayerX = 0;
	else if(intPlayerX > 800)
		intPlayerX = 800;

	if(intPlayerY < 0)
		intPlayerY = 0;
	else if(intPlayerY > 600)
		intPlayerY = 600;
}

function MoveMissile()
{
	for(var i=0; i<arrMissiles.length; i++)
	{
		arrMissiles[i].x += arrMissiles[i].go_x * 3;
		arrMissiles[i].y += arrMissiles[i].go_y * 3;

		if(IsCollisionWithPlayer(arrMissiles[i].x, arrMissiles[i].y))
			onGameOver();

		if(arrMissiles[i].x < 0 || arrMissiles[i].x > 800
			|| arrMissiles[i].y < 0 || arrMissiles[i].y > 600)
		{
			var MissileType = RandomNextInt(4);

			switch(MissileType)
			{
				case 1:
				arrMissiles[i].x = 0;
				arrMissiles[i].y = RandomNextInt(600);
				arrMissiles[i].go_x = RandomNextInt(2);
				arrMissiles[i].go_y = -2 + RandomNextInt(4);
				break;

				case 2:
				arrMissiles[i].x = 800;
				arrMissiles[i].y = RandomNextInt(600);
				arrMissiles[i].go_x = -RandomNextInt(2);
				arrMissiles[i].go_y = -2 + RandomNextInt(4);
				break;

				case 3:
				arrMissiles[i].x = RandomNextInt(800);
				arrMissiles[i].y = 0;
				arrMissiles[i].go_x = -2 + RandomNextInt(4);
				arrMissiles[i].go_y = RandomNextInt(2);
				break;

				case 4:
				arrMissiles[i].x = RandomNextInt(800);
				arrMissiles[i].y = 600;
				arrMissiles[i].go_x = -2 + RandomNextInt(4);
				arrMissiles[i].go_y = -RandomNextInt(2);
				break;
			};
		}
	}

	drawScreen();
}

function IsCollisionWithPlayer(x, y)
{
	var n = 10;

	if(intPlayerX + n > x &&
		intPlayerX - n < x  &&
		intPlayerY - n < y &&
		intPlayerY + n > y)
		return true;
	else
		return false;
}
