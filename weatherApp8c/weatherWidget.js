function WeatherWidget($widget)
{
	 this.update = function()
	 {
	 $(".results", $widget).hide();
	 $(".loading", $widget).show();
	 getWeatherReport();
	 };

	function getWeatherReport()
	{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(
			function(position)
			{
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				var coords  = lat + "," + lon;
				$.ajax({
					url: "https://api.weather.gov/points/" + coords + "/forecast",
					dataType: "json"
				})
				.done(function(data) { populateWeather(data); })
				.fail(function(jqXHR, textStatus, errorThrown) {
					showError(errorThrown);
				});
			},
			function(error)
			{
				$("#controls .error")
					.text("ERROR: " + error.message)
					.slideDown();
			});
		}
	}

	 function populateWeather(data) {

		 //var observation = data.current_observation;

		 $(".results header img", $widget).attr("src",
		 data.properties.periods[10].icon);
		 $(".location>span", $widget).text(data.properties.periods[1].name);
		 $("#cond", $widget).text(data.properties.periods[1].shortForecast);
		 $("#temp", $widget).text(data.properties.periods[1].temperature);
		 $("#det", $widget).text(data.properties.periods[1].detailedForecast);
		 $("#wind", $widget).text(data.properties.periods[1].windSpeed + " "
		 	+ data.properties.periods[1].windDirection);


		 //$(".conditions>span").each(function(i, e)
		 //{
		 //var $span = $(this);
		 //var field = $span.data("field");
		 //$(this).text(observation[field]);
		 //});

		 $(".loading", $widget).fadeOut(function ()
		 {
		 $(".results", $widget).fadeIn();
		 });
	 }

}
