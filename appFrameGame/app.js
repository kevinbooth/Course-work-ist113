"use strict";

// using a function contructor form to create an object
function MyApp()
{
	function newGame(){
	window.location.reload();
	}

	var numGuessLog = [];
	var attemptCounter = 0;

	function initiateNumber(){
		var winningNumber = parseInt(document.getElementById('num1').value);
		document.getElementById('num1').style.display = 'none';
	}

	function evaluateGuess(){
		var winningNumber = parseInt(document.getElementById('num1').value);
		console.log(winningNumber);
		var numGuess = parseInt(document.getElementById('num2').value);
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
	
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		$("button").on('click', function () {
			newGame();
		});
		$("num1").on('change', function(){
			initiateNumber();
		});
		$("num2").on('change', function(){
			evaluateGuess();
		});
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
