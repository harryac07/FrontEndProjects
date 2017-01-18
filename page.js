$(document).ready(function() {
	// $(window).on("load", function(e) {
	// 	alert("Geolocation not available in chrome due to unsecure http. So, at this moment we have location Kilo (Metropolia Leppavaara) only to fetch informations from API");
	// 	e.stopPropagation();
	// });
	$(window).on("beforeunload load resize", function() { // execute this on loading on mobile device 
		window.lat;
		window.lng;
		if (navigator.geolocation) { // if location turns on, this executes
			navigator.geolocation.getCurrentPosition(function(position) {
				$("#demo").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
				window.lat = position.coords.latitude;
				window.lng = position.coords.longitude;
				console.log('lat: '+window.lat);
				console.log('lon: '+window.lng);

				// Weather setup using openweather api 
				$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + encodeURIComponent(window.lat) + "&lon=" + encodeURIComponent(window.lng) + "&appid=c0b26e96759334379813822b06b7afb1", function(data) {
					console.log(data.name);
					console.log('lat:2 '+window.lat);
					$("#location").html(data.name); // fetching jsondata from api as a string
					$("#weather").html("<p style='font-size:22px'>"+data.weather[0].description+"</p>");
					var cMin = Math.round((data.main.temp - 273.15) * 100) / 100; // changing kelvon to celcius and rounding to two decimals.
					$("#temp").html("Temperature: " + "<br>" + cMin + " &#8451");
					if ((data.weather[0].main).match(/clear/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0079.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/rain/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0003.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/cloud/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0068.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/thunderstorm/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0059.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/snow/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0087.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/fog/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0085.gif"  height="250px" width="250px" style="border:0;border-radius:50px">');
					} else if ((data.weather[0].main).match(/drizzle/i)) {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0104.gif"  height="250px" width="250px" style="border:0;border-radius:50px">');
					} else {
						$("#weatherimage").empty().append('<img src="http://www.animatedimages.org/data/media/148/animated-weather-image-0077.gif" height="250px" width="250px" style="border:0;border-radius:50px">');
					}


				});


			});
		} // nav. geolocation condition ends here
		$('#playgame,#gohomeDialogue,#dialoguePlayGame').click(function(e) { // game opening in same browser
			e.preventDefault();
			window.location = ($(this).attr('href'));
		});


		var newWindowWidth = $(window).width();
		if (newWindowWidth < 400) //check for width
		{
			$("#headtop").remove(); // remove mobile programming button
			$("#btn1,#btn2,#btn3,#btn4").addClass("btn-sm");
			$("#btn1,#btn2,#btn3,#btn4").css({
				"max-width": "auto",
				"max-height": "auto"
			});
		} else {
			$("#btn1,#btn2,#btn3,#btn4").addClass("btn-sm");
			$("#btn1,#btn2,#btn3,#btn4").css({
				"max-width": "auto",
				"max-height": "auto"
			});
		}
	});

});