$(document).ready(function() {
	
	// Setting up jQuery UI tabs
		$("#tabsMain").tabs();
		$("#tabsStart").tabs();
		$("#tabsTimeline").tabs();
		$("#tabsComputerSkills").tabs(); // tabs can be nested!
		$("#tabsMerits").tabs();
		$("#tabsEmployment").tabs();

	// Tab: Default: Summary education: Progressbar(s)

		// Get up-to-date course data from JSON file ../data/courses.json
			bscCoursesGetJSON(); // mscCoursesGETJSON is run from inside bscProgressBar and degreesProgressBar is run from inside mscProgressBar
				// This way there's an async (GET JSON) cascade.

			function bscCoursesGetJSON() {
				// https://stackoverflow.com/questions/4200641/how-to-return-a-value-from-a-function-that-calls-getjson

				$.getJSON( "data/courses.json", function ( data ) {
					//console.log( data );
					let bscCreditsComplete = 	data.bsc.semester1.s1c1.credits + 
												data.bsc.semester1.s1c2.credits + 
												data.bsc.semester1.s1c3.credits + 
												data.bsc.semester2.s2c1.credits +
												data.bsc.semester3.s3c1.credits + 
												data.bsc.semester3.s3c2.credits + 
												data.bsc.semester3.s3c3.credits +
												data.bsc.semester4.s4c1.credits +
												data.bsc.semester4.s4c4.credits +
												data.bsc.semester5.s5c1.credits +
												data.bsc.semester5.s5c2.credits + 
												data.bsc.semester5.s5c3.credits +
												data.bsc.semester6.s6c1.credits;

					let bscCreditsCompletePart = 	(data.bsc.semester2.s2c2.credits - data.bsc.semester2.s2c2.incomplete.reports.credits) + 
													(data.bsc.semester2.s2c3.credits - data.bsc.semester2.s2c3.incomplete.labsReports.credits) + 
													(data.bsc.semester2.s2c4.credits - data.bsc.semester2.s2c4.incomplete.exam.credits) + 
													(data.bsc.semester4.s4c2.credits - data.bsc.semester4.s4c2.incomplete.exam.credits) + 
													(data.bsc.semester4.s4c3.credits - data.bsc.semester4.s4c3.incomplete.exam.credits) + 
													(data.bsc.semester4.s4c5.credits - 
														data.bsc.semester4.s4c5.incomplete.project.credits - 
														data.bsc.semester4.s4c5.incomplete.assignments.credits) + 
													(data.bsc.semester6.s6c2.credits - data.bsc.semester6.s6c2.incomplete.report.credits);

					let bscCreditsTotal = bscCreditsComplete + bscCreditsCompletePart;
					console.log(`Masterexamen: ${bscCreditsTotal}`); // = 146.5
					//return bscCreditsTotal;

					bscProgressBar( bscCreditsTotal );
				});
			}

			function mscCoursesGETJSON( bscCreditsTotal ) {
				// 

				$.getJSON( "data/courses.json", function ( data ) {

					let mscCreditsComplete =	data.msc.semester1.s1c1.credits + 
												data.msc.semester1.s1c3.credits + 
												data.msc.semester2.s2c1.credits + 
												data.msc.semester2.s2c2.credits +
												data.msc.semester3.s3c1.credits + 
												data.msc.semester3.s3c2.credits +
												data.msc.semester3.s3c3.credits;

					let mscCreditsCompletePart =	(data.msc.semester1.s1c2.credits - data.msc.semester1.s1c2.incomplete.publication.credits) + 
													(data.msc.semester2.s2c3.credits - data.msc.semester2.s2c3.incomplete.exam.credits) + 
													(data.msc.semester2.s2c4.credits - data.msc.semester2.s2c4.incomplete.exam.credits) + 
													(data.msc.semester2.s2c5.credits - data.msc.semester2.s2c5.incomplete.report.credits) + 
													(data.msc.semester4.s4c1.credits - data.msc.semester4.s4c1.incomplete.project.credits);

					let mscCreditsTotal = mscCreditsComplete + mscCreditsCompletePart; // = 75.5
					console.log(`Masterexamen: ${mscCreditsTotal} `);

					mscProgressBar ( bscCreditsTotal, mscCreditsTotal);
				});
			}

		//let BSc
		function bscProgressBar( bscCreditsTotal ) {
			// 

			let progressBScHP = Math.round( (parseFloat( bscCreditsTotal / 180) * 100 ));
			$("#progressBSc").css('width', progressBScHP + '%');
			$("#progressBSc").html(progressBScHP + '%');

			mscCoursesGETJSON( bscCreditsTotal );
		}
		
		function mscProgressBar( bscCreditsTotal, mscCreditsTotal) {
			// progressMSc-thesis

			let progressMScHP = Math.round( (parseFloat(mscCreditsTotal / 120) * 100 ));
			$("#progressMSc").css('width', progressMScHP + '%');
			$("#progressMSc").html(progressMScHP + '%');

			let progressMScHPMinusThesis = Math.round( (parseFloat(mscCreditsTotal / (120-30)) * 100 ));
			$("#progressMSc-thesis").css('width', progressMScHPMinusThesis + '%');
			$("#progressMSc-thesis").html(progressMScHPMinusThesis + '%');

			degreesProgressBar( bscCreditsTotal, mscCreditsTotal );
		}

		function degreesProgressBar ( bscCreditsTotal, mscCreditsTotal ) {
			//

			let totalHP = bscCreditsTotal + mscCreditsTotal;
			let progressTotalHP = Math.round( (parseFloat(totalHP / 300) * 100 ));
			$("#progressTotal").css('width', progressTotalHP + '%');
			$("#progressTotal").html(progressTotalHP + '%');
		}


		// Charting pie charts via Google chart
		// https://developers.google.com/chart/interactive/docs/gallery/piechart
			var pieChartBScData = [
				['Task', 'Hours per Day'],
				['Geovetenskap', 117.5],
				['Kemi', 30],
				['Matematik', 20],
				['Geografi (GIS)', 7.5],
				['Geostatistik', 5]
			];
			var pieChartTitle = "Sammanställning Kandidatexamen (180 hp)";
			$("#pieChartBSc").css('width', 832);

			// sumEducation isn't the most elegant way of getting the width. 
			googlePieChart ( "pieChartBSc", "sumEducation", pieChartBScData, pieChartTitle );

			//var pieChartMScData
			var piechartMScData = [
				['Task', 'Hours per Day'],
				['Hydrologi/Hydrogeologi', 40],
				['Geovetenskap', 30],
				['Klimat och miljö', 20],
				['Ex-jobb', 30]
			];
			var pieChartTitle = "Sammanställning Masterexamen (120 hp)";
			googlePieChart ( "pieChartMSc", "sumEducation", piechartMScData, pieChartTitle );

			var pieChartTotalData = [
				['Task', 'Hours per Day'],
				['Hydrologi/Hydrogeologi', 40],
				['Geovetenskap', 30],
				['Klimat och miljö', 20],
				['Ex-jobb', 30]
			];
			var pieChartTitle = "Sammanställning BSc & MSc (300 hp)";
			googlePieChart ( "pieChartTotal", "sumEducation", pieChartTotalData, pieChartTitle );

			function googlePieChart( pieChartID, pieChartContainerID, dataToChart, pieChartTitle ) {
				/*
					https://www.w3schools.com/howto/howto_google_charts.asp
				*/
				// Load google charts
				google.charts.load('current', {
					'packages': ['corechart']
				});
				google.charts.setOnLoadCallback( drawChart );

				// Draw the chart and set the chart values
				function drawChart() {
					/* Why is it so freaking difficult to set a proper chart with. Holy shit?!
					*/
				  var data = google.visualization.arrayToDataTable( dataToChart );

					  // Determine the correct width
					  //var pieChartDivWidth = $( "#" + pieChartID ).width(); // =-32?!
					  var pieContainerWidth = $("#" + pieChartContainerID).width();
					  var pieChartWidth = pieContainerWidth * 1.0;
					  //console.log(pieChartWidth);
				  // Optional; add a title and set the width and height of the chart
				  var options = {
				  	'title': pieChartTitle, 
				  	//'width': pieChartWidth, 
				  	'height': 400,
				  	chartArea:{
				  		//left: 200,
				  		//top: 40,
				  		//width: 832
				  		//height:'100%'
				  	}
				  };

				  // Display the chart inside the <div> element with id="pieChartID"
				  var chart = new google.visualization.PieChart(document.getElementById( pieChartID ));
				  chart.draw(data, options);
				}
			}

	/*	Accordion
		* Used where I want to add personal comments (Utmaningar & lärdomar)
		* https://www.w3schools.com/howto/howto_js_accordion.asp
		* Should I put this in separate file?
	*/ 
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
		    this.classList.toggle("active");
		    var panel = this.nextElementSibling;
		    if (panel.style.maxHeight) {
		      panel.style.maxHeight = null;
		    } else {
		      panel.style.maxHeight = panel.scrollHeight + "px";
		    }
		  });
		}
});
