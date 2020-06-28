$(document).ready(function() {
	
	/*$(".bg-button-work").click(function() {

		//$("#bg-play-collapse").css("width", "1500 px");
		$("#bg-play-collapse").css("display", "none");
		$(".fa-angle-double-left").toggleClass("fa-angle-double-left fa-angle-double-right");
		$(".bg-button-work").attr('id', 'triggered');
	});

	$("#triggered").click(function() {

		$(".bg-play-collapse").css("display", "block");
	});*/
	// Working somewhat
	/*
	$(".bg-button-play").click(function() {

		$("#bg-work-collapse").css("display", "none");
		$(".fa-angle-double-right").toggleClass("fa-angle-double-right fa-angle-double-left");
		$(".bg-button-play").attr('id', 'triggered');
	});*/

	/*$("#triggered").click(function() {

		$(".bg-play-collapse").css("display", "block");
	});*/

	// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp

	$("#playBTN").on("click", myFunction);

	function myFunction() {
		var x = document.getElementById("bg-play-collapse");
		if (x.style.display === "none") {
		    x.style.display = "block";
		  } else {
		    x.style.display = "none";
		  }
		}
});
