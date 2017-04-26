var mario = document.getElementById("mario");

var marioleft = 0;
var mariotop = 335;

var hspeed = 0;
var haccel = 0;

var vspeed = 0;

window.onkeydown = function() {
	keycode = event.keyCode;

	if(keycode == 39)
	{
		haccel = 1;
		mario.style.backgroundImage = "url('./rightstanding.png')";
	}
	else if(keycode == 37)
	{
		haccel = -1;
		mario.style.backgroundImage = "url('./leftstanding.png')";
	}
	else if(keycode == 38)
	{
		if(mariotop == 335)
			vspeed = 20;
	}
}

window.onkeyup = function() {
	haccel = 0;
}

function calc() {
	hspeed += haccel;

	if(haccel == 0 && mariotop == 335)
	{
		if(hspeed > 0)
			hspeed--;
		else if(hspeed < 0)
			hspeed++;
	}

	if(hspeed > 15)
		hspeed = 15;
	else if(hspeed < -15)
		hspeed = -15;

	marioleft += hspeed;

	if(marioleft <= 0)
	{
		hspeed = 0;
		marioleft = 0;
	}
	else if(marioleft >= 480)
	{
		hspeed = 0;
		marioleft = 480;
	}

	mario.style.left = marioleft + "px";

	mariotop -= vspeed;

	if(mariotop < 0)
		mariotop = 0;
	else if(mariotop > 335)
		mariotop = 335;

	vspeed -= 1;

	mario.style.top = mariotop + "px";
}

window.setInterval(calc, 16);