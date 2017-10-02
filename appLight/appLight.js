function changeColor() {
   document.getElementById('left').style.backgroundColor="white";
   document.getElementById('body').style.backgroundColor="black";
   document.getElementById('right').style.backgroundColor="black";
   document.getElementById('title').innerHTML="OFF";
   document.getElementById('title').style.color="white";
}

function colorChange2() {
	document.getElementById('left').style.backgroundColor="black";
   document.getElementById('body').style.backgroundColor="white";
   document.getElementById('right').style.backgroundColor="white";
    document.getElementById('title').innerHTML="ON"
	 document.getElementById('title').style.color="black";
}