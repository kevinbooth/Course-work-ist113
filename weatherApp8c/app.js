"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.2";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	function getLocation()
	{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(
			function(position)
			{
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
			},
			function(error)
			{
				$("#controls .error")
					.text("ERROR: " + error.message)
					.slideDown();
			});
		}
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");

		var $weather = $("#weather-widget");
		var weatherWidget = new WeatherWidget($weather);

		$("#getWeather").on("click", function() {
			weatherWidget.update();
			getLocation();
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
