/*==============================================================================
    Routines written by John Gardner - 2004

    See www.braemoor.co.uk/software for information about more freeware
    available.
		
		Version V01X02 - 1st May 2008
		                 updated to report "not available" if last modified date is
		                 not returned. This was true for Safari under Windows.
                     
                     12th October 2008
                     Dutch translation by Jeanette Gerritsen

/*==============================================================================

Parameters:

als time = True, wordt de tijd getoond, als time = False wordt de tijd niet getoond.
Deze tekst in je document op de plaats waar de datum gewijzigd moet komen:
	<script type="text/javascript">writeDateModified (false);</script>
or   
	<script type="text/javascript">writeDateModified (true);</script>

Het kan zijn dat er geen datum doorgegeven wordt door de server, dan wordt de tekst "niet beschikbaar" getoond.
*/

function writeDateModified (time) {
  var days = new Array;                        // Array voor de namen van de dagen
  var months = new Array;                      // Array voor de namen van de maanden
  // Load up day names
  days[0] = "zondag";
  days[1] = "maandag";
  days[2] = "dinsdag";
  days[3] = "woensdag";
  days[4] = "donderdag";
  days[5] = "vrijdag";
  days[6] = "zaterdag";

  // Load up month names
  months[0] = "januari";
  months[1] = "februari";
  months[2] = "maart";
  months[3] = "april";
  months[4] = "mei";
  months[5] = "juni";
  months[6] = "juli";
  months[7] = "augustus";
  months[8] = "september";
  months[9] = "oktober";
  months[10] = "november";
  months[11] = "december";

  // Assign date variables with document.lastModified 
  var modDate = new Date(Date.parse(document.lastModified));
  
  // If we have a valid date reformat it.
  if (modDate != 0 && modDate != "Invalid Date") {
  
    // Set up day variable to hold the name of the day
    var day = days[modDate.getDay()];
    
    // ndate variable holds day of month
    var ndate = modDate.getDate();
    
    // Set up month variable to hold the name of the month
    var month = months[modDate.getMonth()];
    
    // Get the year and if it is less than 1000 add 1900 to it.
    var year = modDate.getYear();
    if (year < 1000) year = year + 1900;
    
    // Load up the time variables if required
    if (time) {
      var hour = modDate.getHours().toString();
      if (hour.length == 1) hour = "0" + hour; 
      var minute = modDate.getMinutes().toString();
      if (minute.length == 1) minute = "0" + minute;
      var second = modDate.getSeconds().toString();
      if (second.length == 1) second = "0" + second;
    }
    
    // Display date and time document was last updated.
    document.write(day + " " + ndate + " " + month + " " + year+ "  ");
    if (time) {
      document.write(hour + ":" + minute + ":" + second);
    }
  }
	else document.write("niet beschikbaar");
}