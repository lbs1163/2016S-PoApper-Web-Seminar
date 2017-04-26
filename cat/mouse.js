var i = 0;

function follow(evt) {
	var cat = document.getElementById("cat");
	cat.style.left = evt.pageX + 'px';
	cat.style.top = evt.pageY + 'px';
}
function bigger(elem) {
	elem.style.width = elem.offsetWidth * 2 + 'px';
	elem.style.height = elem.offsetHeight * 2 + 'px';
}

function smaller(elem) {
	elem.style.width = elem.offsetWidth / 2 + 'px';
	elem.style.height = elem.offsetHeight / 2 + 'px';
}

function stamp(evt) {
	var cat = document.getElementById("cat");
	var dupcat = cat.cloneNode(true);
	if (i % 2 == 0)
		bigger(cat);
	else
		smaller(cat);
	i++;
	document.body.appendChild(dupcat);
}

document.onmousemove = follow;
document.onclick = stamp;