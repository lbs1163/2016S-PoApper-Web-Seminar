window.onload = function(){

	var divName = 'moving';

	function follow(evt) {
	    var obj = document.getElementById('moving1').style;
	    obj.left = evt.pageX + 'px';
	    obj.top = evt.pageY + 'px'; 
	    }

	document.onmousemove = follow;

	document.addEventListener("click", function() {
		var stamp = document.getElementById('moving1').cloneNode(true);

		document.body.appendChild(stamp);

		document.getElementById('moving1').style.zIndex++;

		var arr = [];

		for(var i=0; i<5; i++)
		{
			var temp = document.getElementById(divName + (i + 1));

			if(temp.currentStyle)
				arr.push(temp.currentStyle['backgroundColor']);
			else
				arr.push(document.defaultView.getComputedStyle(temp, null)['backgroundColor']);
		}

		for(var i=0; i<5; i++)
			document.getElementById(divName + (i + 1)).style.backgroundColor = arr[(i + 1) % 5];
	})
}