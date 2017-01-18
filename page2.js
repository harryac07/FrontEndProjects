//var j=0;
var arr = [];
var random;
var best = 0; // for high score
var color;
var button = 0; // button length to be count
var colorArray = { // collection of colors 
	1: "red",
	2: "blue",
	3: "green"
};

$(document).ready(function() { /* For Mobile Device view */
	$(window).on("load resize", function(e) { // execute this on loading on mobile device 
		var newWindowWidth = $(window).width();
		if (newWindowWidth < 400) //check for width
		{
			console.log(newWindowWidth);
			$("#playGame").hide();
			$(".well").css("margin", "0 0px 0 0px");
			$(".well").addClass("text-center");
			$(".jumbotron").css("margin", "0 0px 0 0px");
			$("button").removeClass("btn-lg");
			$("#table").removeClass("row");
			$("button").addClass("btn-sm");
			$("#grid-box").css("margin-left", "35px"); // place where location and score card exists below header
			$("button").css({
				"max-height": "30px",
				"width": "60px"
			});
			$("#score").hide();
		}
		$("button").css({
			"height": "65px",
			"max-width": "100px"
		});
	});

	/* Handling of Button color game Starts from here*/

	var count = 0;
	var scoreCounter = [];
	if (localStorage.getItem('best') === null) {
		$('#best').html("Highest Score: " + 0);
	} else {
		$('#best').html("Highest Score: " + localStorage.getItem('best')); // prints the best score from local storage
	}

	button = ($("button").length); // count number of buttons
	random = Math.floor((Math.random() * 3) + 1);
	color = colorArray[random]; // colors based on random numbers.
	for (var i = 1; i < button + 2; i++) {
		$("button:nth-child(" + i + ")").attr("id", i); // giving all buttons id attribute 1to 20

	}
	$("#hello").html("color : ");
	$("#hello").css({
		"color": "#000000",
		"text-shadow": "none"
	});
	$("button").click(function() { // when button is clicked the random numbers will bring the colors:
		console.log($("button").css("background-color"));
		random = Math.floor((Math.random() * 3) + 1);
		color = colorArray[random]; // colors based on random numbers.
		$(this).attr("id");
		arr.push($(this).attr("id"));
		scoreCounter.push($(this).attr("id"));
		$(this).css("background-color", color);
		console.log($(this).css("background-color") + " button id: " + $(this).attr("id"));

		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === arr[i + 1]) { // if same button is clicked it doesnot add more to array arr
				arr = [];
			} else { // if button is unique it executes below codes
				if (arr[i] != arr[i + 1] && arr[i - 1] != arr[i]) {
					$("#hello").html("color : " + color);
					$("#hello").css("color", color);
					if ($("#" + arr[i]).css("background-color") === $("#" + arr[i + 1]).css("background-color")) { // if same color
						//$("#"+arr[i]).html("<a href="+"#"+" data-transition="+"flip""></a>");
						$("#" + arr[i]).fadeOut(500, function() { // for fading out for 500 sec and then fade in(using function)

						}).fadeIn();
						$("#" + arr[i + 1]).fadeOut(500, function() {

						}).fadeIn();
						$("#" + arr[i]).prop("disabled", true); // disable the button so that it can't be pressed further & the color is green
						$("#" + arr[i + 1]).prop("disabled", true);
						//$("#"+arr[i+1]+","+"#"+arr[i]).text("Success");
						arr = []; // empty array of ids
						count++;
						$("#runningScore").html(count);
						console.log("count :" + count);

					} else {

						$("#" + arr[i]).prop("disabled", true); // disable the button so that it can't be pressed further
						$("#" + arr[i + 1]).prop("disabled", true);
						console.log("trying");
						if (arr.length == 2) {
							$("#" + arr[i]).css("background-color", "#000000");
							$("#" + arr[i + 1]).css("background-color", "#000000");
							$("#" + arr[i]).css("border-color", "#000000");
							$("#" + arr[i + 1]).css("border-color", "#000000");


							arr = [];
						}
					}
				}
			}
		}
		best = localStorage.getItem('best') || 0; // best score  using local storage
		if (count > best) {
			best = count;
			localStorage.setItem("best", best); // using local storage for high score
			if (scoreCounter.length >= 36) {
				$("#popup").popup("open");
				setTimeout(function() {
					$("#popup").popup("close");
				}, 5000);
			}

		} else {}

		if (scoreCounter.length >= 36) { // with all the button ends

			var minWidth = $(window).width();
			//if(minWidth<400){
			if (count >= 8) {
				$("button").remove();
				$("#hello").html("Your Score is: " + "<span id=" + "num2" + ">" + count + "</span>" + "<br>"); // giving id to count so that it appears green > in below code
				$("#num2").css("color", "green");
				$("#hello").append("<br>" + "Points to pass: 8" + "<br>");
				$("#hello").append("Congratulations! You Passed The Level." + "<br>");
				$("#hello").css({
					"background-color": "#000000",
					"text-shadow": "none",
					"color": "white"
				});
				$("#hello").append("<button id=" + "tryy" + ">Play Again!</button>");
				$("#tryy").addClass("btn btn-primary");
				$("#tryy").css("max-height", "40px");
				$("#tryy").click(function() {
					location.reload(true); // reload the page
				})
			} else {
				$("button").remove();
				$("#hello").html("Your Score is: " + "<span id=" + "num2" + ">" + count + "</span>" + "<br>"); // giving id to count so that it appears green > in below code
				$("#num2").css("color", "green");
				$("#hello").append("<br>" + "Points to pass: 8" + "<br>");
				$("#hello").append("Sorry! Try Again." + "<br>");
				$("#hello").css({
					"background-color": "#000000",
					"text-shadow": "none",
					"color": "white"
				});
				$("#hello").append("<button id=" + "tryy" + ">Play Again!</button>");
				$("#tryy").addClass("btn btn-primary");
				$("#tryy").css("max-height", "40px");
				$("#tryy").click(function() {
					location.reload(true); // reload the page
				})

			}

		}

	}); // button click function ends here

	$('#gohome').click(function(e) { // game opening in same browser
		e.preventDefault();
		window.location = ($(this).attr('href'));
	});
	/* for home page*/
	var windowHeight = $(window).height(); // the home page will set to window screen height
	$("#home").css("height", windowHeight);
	$("#home").css("background-color", "#cceeff");


}); // window.ready functions ends here