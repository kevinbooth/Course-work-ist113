var numGuessLog = [];
var attemptCounter = 0;

function newGame(){
	window.location.reload();
}

function initiateNumber(){
	var winningNumber = document.getElementById('num1').value;
	document.getElementById('num1').style.display = 'none';
}

function evaluateGuess(){
	var winningNumber = document.getElementById('num1').value;
	console.log(winningNumber);
	var numGuess = document.getElementById('num2').value;
	console.log(numGuess);
	
	numGuessLog.push(" " + numGuess);
	document.getElementById('guessLog').innerHTML = numGuessLog;
	
	attemptCounter++;
	document.getElementById('attempts').innerHTML = attemptCounter;
	
	if (numGuess > winningNumber) {
		document.getElementById('response').innerHTML = '<br>You guessed too high';
		document.getElementById('num2').value = "";
	} else if (numGuess < winningNumber) {
		document.getElementById('response').innerHTML = '<br>You guessed too low';
		document.getElementById('num2').value = "";	
	} else {
		document.getElementById('response').innerHTML = '<br>Congratulations! You guessed correctly!'	
	}
	
}
