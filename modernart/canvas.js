var mario = new Image();
mario.src = "./rightstanding.png";
var x1 = 100;
var y1 = 100;
var x2 = 150;
var y2 = 250;

function drawScreen() {
	var canvas = document.getElementById("cv");
	var context = canvas.getContext("2d");
	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,700,700);
	context.fillStyle = "#000000";
	context.fillRect(10,20,30,40);
	context.beginPath();
	context.moveTo(Math.random() * 700,Math.random() * 700);
	context.lineTo(Math.random() * 700,Math.random() * 700);
	context.stroke();
	context.font = "100px Arial";
	context.strokeText("유니코드 되나요?", 200, 200);
	context.drawImage(mario, x1, y1, x2, y2);
}

window.onload = drawScreen;

function changemario() {
	x1 = Math.random() * 700;
	y1 = Math.random() * 700;
	x2 = Math.random() * 700;
	y2 = Math.random() * 700;
}

setInterval(changemario, 100);
setInterval(drawScreen, 10);
