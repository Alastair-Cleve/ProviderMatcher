/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	jQuery.fn.tableToCSV = __webpack_require__(1);

	var providers = __webpack_require__(2);
	var matchRange = 0.1;
	var providerKeys = Object.keys(providers);
	var todays_date = new Date();
	var todays_year = todays_date.getFullYear();

	// For determining locations of providers.
	// var console_locations = [];
	// providerKeys.forEach(function(key) {
	//   providers[key]["locations"].forEach(function(location) {
	//     if (!console_locations.includes(location)) {
	//       console_locations.push(location);
	//     }
	//   });
	// });
	// console.log(console_locations);

	// For determining therapies of providers.
	// var console_therapies = [];
	// providerKeys.forEach(function(key) {
	//   providers[key]["therapies"].forEach(function(therapy) {
	//     if (!console_therapies.includes(therapy)) {
	//       console_therapies.push(therapy);
	//     }
	//   });
	// });
	// console.log(console_therapies);

	$('#sort').on("click", function () {
	  var matchScore = {};

	  var patientSelfDisclosure = parseFloat($('#self-disclosure').val());
	  var patientSolutionOrientation = parseFloat($('#solution-orientation').val());
	  var patientStructured = parseFloat($('#structured').val());
	  var patientActive = parseFloat($('#active').val());
	  var patientMentorScore = parseInt($('#mentor_score').val());
	  var patientAge = parseInt($('#age').val().trim());
	  var genderPreference = $('#gender_preference').val();
	  var patientEthnicity = $('#ethnicity').val();
	  var ethnicityMatters = $('#ethnicity_matters').val();
	  var patientSexualOrientation = $('#sexual_orientation').val();
	  var patientLocation = $('#location').val();
	  var therapiesPreference = $('#therapies').val();
	  var daysPreference = $('#days').val();
	  var timesPreference = $('#times').val();

	  // Testing for age input.
	  var reg = new RegExp('^[0-9]+$');
	  if (patientAge === "" || reg.test($('#age').val()) === false) {
	    $('#age').css("background-color", "lightblue");
	  } else {
	    $('#age').css("background-color", "transparent");
	  }

	  // Initial setup of matchScore object.
	  if (patientSelfDisclosure > 0.6) {
	    providerKeys.forEach(function(key) {
	      if ((providers[key]["self-disclosure"] * 0.1) > 6) {
	        matchScore[key] = 1;
	      } else {
	        matchScore[key] = 0;
	      }
	    });
	  } else {
	    providerKeys.forEach(function(key) {
	      matchScore[key] = 0;
	    });
	  }

	  // Filter for other criteria.
	  providerKeys.forEach(function(key) {
	    if ((providers[key]["solution-orientation"] * 0.1) <= (patientSolutionOrientation + matchRange)
	      && (providers[key]["solution-orientation"] * 0.1) >= (patientSolutionOrientation - matchRange)) {
	        matchScore[key]++;
	      }

	    if ((providers[key]["structured"] * 0.1) <= (patientStructured + matchRange)
	      && (providers[key]["structured"] * 0.1) >= (patientStructured - matchRange)) {
	        matchScore[key]++;
	      }

	    if ((providers[key]["active"] * 0.1) <= (patientActive + matchRange)
	      && (providers[key]["active"] * 0.1) >= (patientActive - matchRange)) {
	        matchScore[key]++;
	      }

	    if (therapiesPreference.includes("All")) {
	      matchScore[key]++;
	    } else {
	      for (var i = 0; i < therapiesPreference.length; i++) {
	        if (providers[key]["therapies"].includes(therapiesPreference[i])) {
	          matchScore[key]++;
	          break;
	        }
	      }
	    }

	    if ([1, 2, 3].includes(patientMentorScore)) {
	      if (((todays_year - providers[key]["birth_year"]) - patientAge) >= 10) {
	        matchScore[key]++;
	      }
	    }

	    if ([4, 5, 6, 7].includes(patientMentorScore)) {
	      matchScore[key]++;
	    }

	    if ([8, 9, 10].includes(patientMentorScore)) {
	      if (Math.abs((todays_year - providers[key]["birth_year"]) - patientAge) <= 5) {
	        matchScore[key]++;
	      }
	    }

	    if (genderPreference === "Men") {
	      if (providers[key]["gender"] === "Male") {
	        matchScore[key]++;
	      }
	    } else if (genderPreference === "Women") {
	      if (providers[key]["gender"] === "Female") {
	        matchScore[key]++;
	      }
	    } else {
	      matchScore[key]++;
	    }

	    if (ethnicityMatters === "Very important" || ethnicityMatters === "Moderately important") {
	      if (providers[key]["ethnicity"] === patientEthnicity) {
	        matchScore[key]++;
	      }
	    } else {
	      matchScore[key]++;
	    }

	    if (providers[key]["sexual_orientation"] === patientSexualOrientation) {
	      matchScore[key]++;
	    }

	    if (patientLocation.includes("All")) {
	      matchScore[key]++;
	    } else {
	      for (var i = 0; i < patientLocation.length; i++) {
	        if (providers[key]["locations"].includes(patientLocation[i])) {
	          matchScore[key]++;
	          break;
	        }
	      }
	    }

	    if (daysPreference.includes("All")) {
	      matchScore[key]++;
	    } else {
	      for (var i = 0; i < daysPreference.length; i++) {
	        if (providers[key]["days"].includes(daysPreference[i])) {
	          matchScore[key]++;
	          break;
	        }
	      }
	    }

	    if (timesPreference.includes("All")) {
	      matchScore[key]++;
	    } else {
	      for (var i = 0; i < timesPreference.length; i++) {
	        if (providers[key]["times"].includes(timesPreference[i])) {
	          matchScore[key]++;
	          break;
	        }
	      }
	    }

	  });

	  // Ordering providers by their match scores.
	  var zeroes = [];
	  var ones = [];
	  var twos = [];
	  var threes = [];
	  var fours = [];
	  var fives = [];
	  var sixes = [];
	  var sevens = [];
	  var eights = [];
	  var nines = [];
	  Object.keys(matchScore).forEach(function(key) {
	    switch (matchScore[key]) {
	      case 0:
	        zeroes.push(key);
	        break;
	      case 1:
	        ones.push(key);
	        break;
	      case 2:
	        twos.push(key);
	        break;
	      case 3:
	        threes.push(key);
	        break;
	      case 4:
	        fours.push(key);
	        break;
	      case 5:
	        fives.push(key);
	        break;
	      case 6:
	        sixes.push(key);
	        break;
	      case 7:
	        sevens.push(key);
	        break;
	      case 8:
	        eights.push(key);
	        break;
	      case 9:
	        nines.push(key);
	        break;
	    }
	  });

	  var sorted = nines.concat(eights).concat(sevens).concat(sixes).concat(fives)
	  .concat(fours).concat(threes).concat(twos).concat(ones).concat(zeroes);

	  $('#root').html("<br><br>");
	  var content = "<table><thead><tr><th>Name</th>" +
	    "<th>Match Score</th>" +
	    "<th>SO</th>" +
	    "<th>Str</th>" +
	    "<th>Act</th>" +
	    "<th>Prac</th>" +
	    "<th>SD</th>" +
	    "<th>Therapies</th>" +
	    "<th>Gender</th>" +
	    "<th>Birth Year</th>" +
	    "<th>Ethnicity</th>" +
	    "<th>Sexual Orientation</th>" +
	    "<th>Locations</th>" +
	    "<th>Availability</th></tr></thead><tbody>";

	  sorted.forEach(function(key) {
	    content += "<tr><td style='text-align:left'>" + providers[key]["name"] + "</td>" +
	      "<td width=3%>" + matchScore[key] + " / 12" + "</td>" +
	      "<td width=3%>" + providers[key]["solution-orientation"] + "</td>" +
	      "<td width=3%>" + providers[key]["structured"] + "</td>" +
	      "<td width=3%>" + providers[key]["active"] + "</td>" +
	      "<td width=3%>" + providers[key]["practical"] + "</td>" +
	      "<td width=3%>" + providers[key]["self-disclosure"] + "</td>" +
	      "<td width=6% style='text-align:left'>" + providers[key]["therapies"].join(", ") + "</td>" +
	      "<td>" + providers[key]["gender"] + "</td>" +
	      "<td>" + providers[key]["birth_year"] + "</td>" +
	      "<td width=8%>" + providers[key]["ethnicity"] + "</td>" +
	      "<td>" + providers[key]["sexual_orientation"] + "</td>" +
	      "<td width=6% style='text-align:left'>" + providers[key]["locations"].join(", ") + "</td>" +
	      "<td style='text-align:left'><b>Days:</b> " + providers[key]["days"].join(", ") +
	        "<br><b>Times:</b> " + providers[key]["times"].join(", ") + "</td>" +
	      "</tr>";
	  });
	  content += "</tbody></table>";
	  $('#root').append(content);
	  $('table').floatThead();

	});

	$("#populate").click(function() {
	  var spreadsheet_hash = {};
	  var spreadsheet_values = $("#spreadsheet-copy-info").val().trim();
	  spreadsheet_values = spreadsheet_values.split("\n");
	  spreadsheet_values.forEach(function(pair) {
	    console.log(spreadsheet_values);
	    console.log(pair);

	    pair = pair.split(":");
	    spreadsheet_hash[pair[0].trim().toLowerCase()] = pair[1].trim();

	    if (["solution-orientation", "structure", "active", "practical", "self-disclosure"].includes(pair[0].trim().toLowerCase())) {
	      spreadsheet_hash[pair[0].trim().toLowerCase()] = (parseInt(pair[1].trim().slice(0, -1)) * 0.01);
	    }
	  });

	  if (spreadsheet_hash["therapies"] != undefined) {
	    spreadsheet_hash["therapies"] = spreadsheet_hash["therapies"].split(",");
	    for (var i = 0; i < spreadsheet_hash["therapies"].length; i++) {
	      spreadsheet_hash["therapies"][i] = spreadsheet_hash["therapies"][i].trim();
	    }
	  }

	  if (spreadsheet_hash["location"] != undefined) {
	    spreadsheet_hash["location"] = spreadsheet_hash["location"].split(",");
	    for (var i = 0; i < spreadsheet_hash["location"].length; i++) {
	      spreadsheet_hash["location"][i] = spreadsheet_hash["location"][i].trim();
	    }
	  }

	  if (spreadsheet_hash["days"] != undefined) {
	    spreadsheet_hash["days"] = spreadsheet_hash["days"].split(",");
	    for (var i = 0; i < spreadsheet_hash["days"].length; i++) {
	      spreadsheet_hash["days"][i] = spreadsheet_hash["days"][i].trim();
	    }
	  }

	  if (spreadsheet_hash["times"] != undefined) {
	    spreadsheet_hash["times"] = spreadsheet_hash["times"].split(",");
	    for (var i = 0; i < spreadsheet_hash["times"].length; i++) {
	      spreadsheet_hash["times"][i] = spreadsheet_hash["times"][i].trim();
	    }
	  }

	  $('#self-disclosure').val((spreadsheet_hash["self-disclosure"] || "0"));
	  $('#solution-orientation').val((spreadsheet_hash["solution-orientation"] || "0"));
	  $('#structured').val((spreadsheet_hash["structure"] || "0"));
	  $('#active').val((spreadsheet_hash["active"] || "0"));
	  $('#practical').val((spreadsheet_hash["active"] || "0")); //Placeholder - '#practical' is not currently in use.

	  $('#therapies').val((spreadsheet_hash["therapies"] || "All"));
	  $('#mentor_score').val((spreadsheet_hash["mentor score"] || "1"));
	  $('#age').val(spreadsheet_hash["age"]);
	  $('#gender_preference').val((spreadsheet_hash["gender preference"] || "Both/Doesn't Matter"));
	  $('#ethnicity').val((spreadsheet_hash["ethnicity"] || "White"));
	  $('#ethnicity_matters').val((spreadsheet_hash["ethnicity matters?"] || "No"));
	  $('#sexual_orientation').val((spreadsheet_hash["sexual orientation"] || "N/A"));
	  $('#location').val((spreadsheet_hash["location"] || "All"));
	  $('#days').val((spreadsheet_hash["days"] || "All"));
	  $('#times').val((spreadsheet_hash["times"] || "All"));

	  $('#sort').click();
	});

	$("#export-csv").click(function() {
	  $("table").tableToCSV();
	});

	$("#modal").leanModal();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function() {
	  if ($('#patient-name').val().trim() === "") {
	    $('#patient-name').css("background-color", "lightblue");
	    return;
	  }

	  var clean_text = function(text) {
	    text = text.replace(/"/g, '""');
	    return '"'+text+'"';
	  };

	  var patient = $('#patient-name').val();
	  var comments = $('#patient-comments').val();
		var title = [];
		var rows = [];

		$(this).find('tr').each(function() {
			var data = [];

			$(this).find('th').each(function() {
	      var text = clean_text($(this).text());
				title.push(text);
			});

			$(this).find('td').each(function() {
	      var text = clean_text($(this).text());
				data.push(text);
			});

			data = data.join(",");
			rows.push(data);
		});

		title = title.join(",");
		rows = rows.join("\n");

		var csv = clean_text("Name:") + "," + clean_text("" + patient) + "\n" +
	    clean_text("Date:") + "," + clean_text("" + new Date()) + "\n" +
	    clean_text("Comments:") + "," + clean_text("" + comments) + "\n\n" + title + rows;
		var uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);

	  var download_link = document.createElement('a');
		download_link.href = uri;

	  var date = new Date();
	  var ts = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();

		download_link.download = patient.trim().replace(/ /g,"_") + "_" + ts + ".csv";
		document.body.appendChild(download_link);
		download_link.click();
		document.body.removeChild(download_link);

	  $('#patient-name').val("");
	  $('#patient-comments').val("");
	  $('#lean_overlay').click();
	  $('#patient-name').css("background-color", "transparent");

	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	var providers = {
	  1: { "name": "John Clarke",
	       "solution-orientation": 6,
	       "structured": 6,
	       "active": 8,
	       "practical": 4,
	       "self-disclosure": 9,
	       "gender": "Male",
	       "birth_year": 1988,
	       "ethnicity": "White",
	       "sexual_orientation": "Straight",
	       "locations": ["Noe Valley"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Coaching"],
	       "days": ["Tuesday","Wednesday"],
	       "times": ["Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	  2: { "name": "Sadie Phillips",
	       "solution-orientation": 6,
	       "structured": 5,
	       "active": 8,
	       "practical": 8,
	       "self-disclosure": 7,
	       "gender": "Female",
	       "birth_year": 1983,
	       "ethnicity": "White",
	       "sexual_orientation": "Straight",
	       "locations": ["Pacific Heights"],
	       "therapies": ["Cognitive Behavioral Therapy","Interpersonal Therapy","Eclecticism","Clinical Health Psychology"],
	       "days": ["Monday","Wednesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	  3: { "name": "Neil Howell",
	       "solution-orientation": 8,
	       "structured": 8,
	       "active": 8,
	       "practical": 7,
	       "self-disclosure": 7,
	       "gender": "Male",
	       "birth_year": 1963,
	       "ethnicity": "White",
	       "sexual_orientation": "Bisexual",
	       "locations": ["Pacific Heights"],
	       "therapies": ["Cognitive Behavioral Therapy","Interpersonal Therapy","Coaching"],
	       "days": ["Thursday","Saturday (limited)","Sunday (limited)"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   4: {"name": "Ashley Crouch",
	       "solution-orientation":7,
	       "structured":6,
	       "active":9,
	       "practical":10,
	       "self-disclosure":7,
	       "gender":"Female",
	       "birth_year":1983,
	       "ethnicity":"White",
	       "sexual_orientation":"Straight",
	       "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"],
	       "therapies": ["Psychodynamic","Humanistic","Mindfulness/Meditation"],
	       "days": ["Monday","Wednesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   5:  {"name": "Emily Mills",
	        "solution-orientation":4,
	   	"structured":2,
	   	"active":6,
	   	"practical":5,
	   	"self-disclosure":1,
	   	"gender":"Female",
	   	"birth_year":1982,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Gay/Lesbian",
	   	"locations": ["Pacific Heights"],
	       "therapies": ["Psychodynamic","Interpersonal Therapy","Mindfulness/Meditation"],
	       "days": ["Monday","Wednesday","Friday","Saturday (limited)"],
	       "times": ["Evening (5pm - 8pm)"]},

	   6:  {"name": "Rochelle Greenhagen",
	       "solution-orientation":3,
	   	"structured":1,
	   	"active":7,
	   	"practical":9,
	   	"self-disclosure":5,
	   	"gender":"Female",
	   	"birth_year":1984,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Straight",
	   	"locations": ["Marina/Cow Hollow"],
	       "therapies": ["Psychodynamic","Humanistic","Relational"],
	       "days": ["Tuesday","Wednesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   7:     {"name": "Adam Snow",
	       "solution-orientation":5,
	   	"structured":1,
	   	"active":5,
	   	"practical":6,
	   	"self-disclosure":2,
	   	"gender":"Male",
	   	"birth_year":1982,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Bisexual",
	   	"locations": ["Hayes Valley/Lower Haight/Duboce Triangle"],
	       "therapies": ["Psychodynamic","Humanistic","Interpersonal Therapy"],
	       "days": ["Monday","Thursday","Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)","Evening (5pm - 8pm)"]},

	   8:     {"name": "Sarah Soul",
	       "solution-orientation":3,
	   	"structured":5,
	   	"active":8,
	   	"practical":10,
	   	"self-disclosure":0,
	   	"gender":"Female",
	   	"birth_year":1976,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Gay/lesbian",
	   	"locations": ["Castro/Twin Peaks"],
	       "therapies": ["Psychodynamic","Humanistic","Cognitive Behavioral Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Monday","Tuesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)"]},

	   9:     {"name": "Bradford Smallwood",
	       "solution-orientation":7,
	   	"structured":4,
	   	"active":8,
	   	"practical":10,
	   	"self-disclosure":3,
	   	"gender":"Male",
	   	"birth_year":1979,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Straight",
	   	"locations": ["Marina/Cow Hollow"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy"],
	       "days": ["Tuesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   10:    {"name": "Diane DuBois",
	       "solution-orientation":8,
	   "structured":6,
	   "active":8,
	   "practical":10,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1958,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Pacific Heights"],
	       "therapies": ["Psychodynamic","Humanistic","Cognitive Behavioral Therapy","Interpersonal Therapy","Coaching"],
	       "days": ["Tuesday","Thursday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   11:    {"name": "Beth Cassel",
	       "solution-orientation":4,
	   "structured":3,
	   "active":7,
	   "practical":8,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1958,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["RichMondayd"],
	       "therapies": ["Psychodynamic","Humanistic","Mindfulness/Meditation"],
	       "days": ["Tuesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   12:    {"name": "Holly Greenberg",
	       "solution-orientation":5,
	   "structured":0,
	   "active":7,
	   "practical":9,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1970,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Pacific Heights"],
	       "therapies": ["Psychoanalytical","Psychodynamic","Somatic Therapy"],
	       "days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday (limited)","Sunday (limited)"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   13:    {"name": "Erika Gimbel",
	       "solution-orientation":6,
	   "structured":3,
	   "active":8,
	   "practical":9,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1970,
	   "ethnicity":"White",
	   "sexual_orientation":"Unknown",
	   "locations": ["Pacific Heights","East Bay/Berkeley"],
	       "therapies": ["Experiential Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Monday","Tuesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   14:    {"name": "Andrea Crapanzano",
	       "solution-orientation":4,
	   "structured":3,
	   "active":5,
	   "practical":3,
	   "self-disclosure":1,
	   "gender":"Male",
	   "birth_year":1979,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"],
	       "therapies": ["Psychoanalytical","Psychodynamic","Interpersonal Therapy"],
	       "days": ["Friday"],
	       "times": ["Afternoon (2pm - 5pm)"]},

	   15:    {"name": "Michael Milazzo",
	       "solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":8,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1973,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Financial District","Castro/Twin Peaks"],
	       "therapies": ["Cognitive Behavioral Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Wednesday","Thursday","Saturday (limited)"],
	       "times": ["Afternoon (2pm - 5pm)"]},

	   16:    {"name": "Warren Miller",
	       "solution-orientation":7,
	   "structured":3,
	   "active":8,
	   "practical":10,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1969,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"],
	       "therapies": ["Psychodynamic","Humanistic","Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy","Eclecticism","Mindfulness/Meditation"],
	       "days": ["Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   17:    {"name": "Aaron Hagaman",
	       "solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":3,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1980,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"],
	       "therapies": ["Experiential Therapy","Somatic Therapy"],
	       "days": ["Tuesday","Wednesday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   18:    {"name": "Manami Yamamoto",
	       "solution-orientation":5,
	   "structured":7,
	   "active":5,
	   "practical":9,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1979,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Straight",
	   "locations": ["East Bay/Berkeley","South Bay","Laurel Heights"],
	       "therapies": ["Jungian Psychotherapy","Humanistic","Cognitive Behavioral Therapy","Mindfulness/Meditation","Coaching","Existential Therapy","Expressive Arts Therapy"],
	       "days": ["Monday","Tuesday","Wednesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   19:    {"name": "Gabriel Thibaut de Maisieres",
	       "solution-orientation":5,
	   "structured":3,
	   "active":7,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Male",
	   "birth_year":1965,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Unknown",
	   "locations": ["Financial District","Union Square/Mid-Market"],
	       "therapies": ["Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy","Coaching","Psychodrama"],
	       "days": ["Wednesday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   20:    {"name": "Stacey McGuirl",
	       "solution-orientation":5,
	   "structured":3,
	   "active":7,
	   "practical":5,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1980,
	   "ethnicity":"White",
	   "sexual_orientation":"Bisexual",
	   "locations": ["Financial District","SoMa"],
	       "therapies": ["Psychoanalytical","Cognitive Behavioral Therapy","Coaching"],
	       "days": ["Monday","Wednesday","Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   21:    {"name": "Tess Brigham",
	       "solution-orientation":9,
	   "structured":5,
	   "active":9,
	   "practical":10,
	   "self-disclosure":8,
	   "gender":"Female",
	   "birth_year":1973,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","East Bay/Berkeley"],
	       "therapies": ["Cognitive Behavioral Therapy","Coaching"],
	       "days": ["Wednesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   22:    {"name": "Hillary Dupuis",
	       "solution-orientation":8,
	   "structured":5,
	   "active":8,
	   "practical":10,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Mindfulness/Meditation"],
	       "days": ["Wednesday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   23:    {"name": "Jessica Harvey",
	       "solution-orientation":7,
	   "structured":2,
	   "active":8,
	   "practical":10,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1981,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Marina/Cow Hollow"],
	       "therapies": ["Humanistic","Interpersonal Therapy","Eclecticism"],
	       "days": ["Monday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   24:    {"name": "Alicia Stephen",
	       "solution-orientation":4,
	   "structured":4,
	   "active":8,
	   "practical":7,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1988,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Pansexual",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy","Coaching","Drama Therapy And Arts Therapy"],
	       "days": ["Tuesday","Wednesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   25:    {"name": "Jo Anna Costa",
	       "solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":10,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1975,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Peninsula"],
	       "therapies": ["Cognitive Behavioral Therapy","Eclecticism","Coaching","Solution Focused"],
	       "days": ["Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   26:    {"name": "Barbara Lankamp-Kochis",
	       "solution-orientation":9,
	   "structured":8,
	   "active":10,
	   "practical":10,
	   "self-disclosure":7,
	   "gender":"Female",
	   "birth_year":1984,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Martinez"],
	       "therapies": ["Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy"],
	       "days": ["Monday","Tuesday","Wednesday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   27:    {"name": "Jennifer Normoyle",
	       "solution-orientation":8,
	   "structured":3,
	   "active":6,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1986,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Interpersonal Therapy"],
	        "days": ["Wednesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   28:    {"name": "Natasha Collins",
	       "solution-orientation":7,
	   "structured":5,
	   "active":7,
	   "practical":8,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1976,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"],
	       "therapies": ["Cognitive Behavioral Therapy"],
	       "days": ["Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)"]},

	   29:    {"name": "Senna Osby",
	       "solution-orientation":5,
	   "structured":0,
	   "active":5,
	   "practical":10,
	   "self-disclosure":0,
	   "gender":"Female","birth_year":1976,
	   "ethnicity":"Black or African American",
	   "sexual_orientation":"Straight",
	   "locations": ["Lower Pacific Heights"],
	       "therapies": ["Psychodynamic","Eclecticism","Person-Centered Therapy"],
	       "days": ["Tuesday","Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)","Evening (5pm - 8pm)"]},

	   30:    {"name": "Lori Fink",
	       "solution-orientation":6,
	   "structured":3,
	   "active":8,
	   "practical":8,"self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Psychodynamic","Cognitive Behavioral Therapy","Eclecticism","Mindfulness/Meditation","AEDP"],
	        "days": ["Wednesday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Evening (5pm - 8pm)"]},

	   31:    {"name": "Amy Swart",
	       "solution-orientation":5,
	   "structured":3,
	   "active":5,
	   "practical":7,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1985,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Union Square/Mid-Market"],
	       "therapies": ["Humanistic","Interpersonal Therapy","Mindfulness/Meditation"],
	       "days": ["Tuesday","Thursday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   32:    {"name": "Liz Michaud",
	       "solution-orientation":5,
	   "structured":5,
	   "active":5,
	   "practical":8,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1985,
	   "ethnicity":"White",
	   "sexual_orientation":"Questioning/other",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Psychodynamic","Humanistic","Gestalt"],
	       "days": ["Friday","Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   33:    {"name": "Clark Hsu",
	       "solution-orientation":3,
	   "structured":4,
	   "active":7,
	   "practical":8,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1989,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"],
	       "therapies": ["Humanistic","Mindfulness/Meditation"],
	       "days": ["Wednesday"],
	       "times": ["Mornings (7am - 11am)"]},

	   34:    {"name": "Talia Recht",
	       "solution-orientation":5,
	   "structured":4,
	   "active":9,
	   "practical":9,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1987,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"],
	       "therapies": ["Psychodynamic","Cognitive Behavioral Therapy","Eclecticism"],
	       "days": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   35:    {"name": "Zeynep Kagan",
	       "solution-orientation":5,
	   "structured":5,
	   "active":7,
	   "practical":7,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1982,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"],
	       "therapies": ["Psychodynamic","Humanistic","Interpersonal Therapy"],
	       "days": ["Monday","Tuesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	   36:    {"name": "Giancarlo Scherillo",
	       "solution-orientation":4,
	   "structured":2,
	   "active":5,
	   "practical":8,
	   "self-disclosure":2,
	   "gender":"Male",
	   "birth_year":1984,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["RichMondayd"],
	       "therapies": ["Psychodynamic","Mindfulness/Meditation"],
	       "days": ["Tuesday","Thursday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   37:    {"name": "Emily Adams",
	       "solution-orientation":5,
	   "structured":3,
	   "active":6,
	   "practical":8,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1989,
	   "ethnicity":"White",
	   "sexual_orientation":"Questioning/other",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Psychodynamic","Humanistic","Interpersonal Therapy","Mindfulness/Meditation"],
	       "days": ["Monday","Tuesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   38:    {"name": "Cosmin Gheorghe",
	       "solution-orientation":10,
	   "structured":7,
	   "active":10,
	   "practical":10,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1974,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"],
	       "therapies": ["Cognitive Behavioral Therapy","Eclecticism","Coaching"],
	       "days": ["Tuesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   39:    {"name": "Chip Murray",
	       "solution-orientation":7,
	   "structured":3,
	   "active":8,
	   "practical":9,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1966,
	   "ethnicity":"White",
	   "sexual_orientation":"Unknown",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Psychodynamic","Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy","Eclecticism"],
	       "days": ["Tuesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)"]},

	   40:    {"name": "Dimitra Farmas",
	       "solution-orientation":8,
	   "structured":3,
	   "active":6,
	   "practical":9,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1978,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Castro/Twin Peaks"],
	       "therapies": ["Cognitive Behavioral Therapy","Interpersonal Therapy","Mindfulness/Meditation"],
	       "days": ["Monday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	   41:    {"name": "Elizabeth Heuser",
	       "solution-orientation":4,
	   "structured":3,
	   "active":5,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1978,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"],
	       "therapies": ["Humanistic","Mindfulness/Meditation"],
	       "days": ["Saturday (limited)"],
	       "times": ["Mornings (7am - 11am)","Evening (5pm - 8pm)"]},

	   42:    {"name": "Chia Ning (Michelle) Chang",
	       "solution-orientation":7,
	   "structured":3,
	   "active":7,
	   "practical":7,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1988,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Bisexual",
	   "locations": ["Noe Valley"],
	       "therapies": ["Psychodynamic","Experiential Therapy","Coaching","Strategic Family Therapy"],
	       "days": ["Wednesday","Thursday","Sunday (limited)"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)"]},

	   43:    {"name": "Madhu Batheja",
	       "solution-orientation":6,
	   "structured":1,
	   "active":8,
	   "practical":9,
	   "self-disclosure":1,
	   "gender":"Female",
	   "birth_year":1951,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Unknown",
	   "locations": ["Pacific Heights"],
	       "therapies": ["Psychodynamic","Eclecticism","Somatic Therapy"],
	       "days": ["Tuesday","Wednesday","Thursday"],
	       "times": ["Afternoon (2pm - 5pm)"]},

	   44:    {"name": "Holly Micheletos",
	       "solution-orientation":6,
	   "structured":5,
	   "active":7,
	   "practical":9,
	   "self-disclosure":1,
	   "gender":"Female",
	   "birth_year":1966,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["RichMondayd"],
	       "therapies": ["Psychodynamic","Cognitive Behavioral Therapy","Interpersonal Therapy"],
	       "days": ["Monday","Tuesday","Wednesday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	45:    {"name": "Nadia Ashjaee",
	       "solution-orientation":7,
	   "structured":7,
	   "active":7,
	   "practical":8,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1980,
	   "ethnicity":"Middle Eastern or North African",
	   "sexual_orientation":"Straight",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Interpersonal Therapy","Experiential Therapy"],
	       "days": ["Monday","Tuesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	46:    {"name": "Kip Williams",
	       "solution-orientation":5,
	   "structured":2,
	   "active":7,
	   "practical":3,
	   "self-disclosure":7,
	   "gender":"Male",
	   "birth_year":1982,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Civic Center"],
	       "therapies": ["Humanistic","Mindfulness/Meditation","Acceptance And Commitment Therapy"],
	       "days": ["Tuesday"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	47:    {"name": "Tracy McGillis",
	       "solution-orientation":6,
	   "structured":4,
	   "active":8,
	   "practical":9,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1974,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Interpersonal Therapy","Eclecticism","Mindfulness/Meditation","Coaching"],
	       "days": ["Wednesday","Thursday","Friday"],
	       "times": ["Mornings (7am - 11am)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	48:    {"name": "Lauren Korshak",
	       "solution-orientation":5,
	   "structured":5,
	   "active":7,
	   "practical":8,
	   "self-disclosure":1,
	   "gender":"Female",
	   "birth_year":1983,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Hayes Valley/Lower Haight/Duboce Triangle"],
	       "therapies": ["Psychodynamic","Jungian Psychotherapy","Cognitive Behavioral Therapy","Interpersonal Therapy","Experiential Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)"]},

	49:    {"name": "Laura Futransky",
	       "solution-orientation":3,
	   "structured":2,
	   "active":6,
	   "practical":9,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1983,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Psychodynamic","Experiential Therapy","Acceptance And Commitment Therapy"],
	       "days": ["Tuesday","Wednesday","Thursday"],
	       "times": ["Mornings (7am - 11am)","Evening (5pm - 8pm)"]},

	50:    {"name": "JS Very",
	       "solution-orientation":5,
	   "structured":5,
	   "active":7,
	   "practical":7,
	   "self-disclosure":6,
	   "gender":"Trans FTM",
	   "birth_year":1982,
	   "ethnicity":"White",
	   "sexual_orientation":"Pansexual",
	   "locations": ["Union Square/Mid-Market"],
	       "therapies": ["Humanistic","Cognitive Behavioral Therapy","Mindfulness/Meditation"],
	       "days": ["Wednesday","Thursday","Saturday (limited)"],
	       "times": ["Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	51:    {"name": "Doug Ronning",
	       "solution-orientation":6,
	   "structured":7,
	   "active":7,
	   "practical":9,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1962,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Noe Valley"],
	       "therapies": ["Jungian Psychotherapy","Experiential Therapy","Mindfulness/Meditation"],
	       "days": ["Monday","Tuesday"],
	       "times": ["Afternoon (2pm - 5pm)"]},

	52:    {"name": "Nicole O'Connor",
	       "solution-orientation":4,
	   "structured":3,
	   "active":7,
	   "practical":8,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Noe Valley"],
	       "therapies": ["Psychodynamic","Cognitive Behavioral Therapy","Interpersonal Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Tuesday","Thursday"],
	       "times": ["Midday (11am - 2pm)"]},

	53:    {"name": "Betty Michaud",
	       "solution-orientation":3,
	   "structured":3,
	   "active":5,
	   "practical":5,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1971,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Straight",
	   "locations": ["Noe Valley"],
	       "therapies": ["Humanistic","Interpersonal Therapy","Mindfulness/Meditation"],
	       "days": ["Thursday"],
	       "times": ["Afternoon (2pm - 5pm)"]},

	54:    {"name": "Travis Robinson",
	       "solution-orientation":7,
	   "structured":7,
	   "active":8,
	   "practical":5,
	   "self-disclosure":8,
	   "gender":"Male",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Marina/Cow Hollow"],
	       "therapies": ["Humanistic","Experiential Therapy","Mindfulness/Meditation"],
	       "days": ["Monday","Tuesday","Wednesday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	55:    {"name": "Julia Lehrman",
	       "solution-orientation":8,
	   "structured":7,
	   "active":7,
	   "practical":8,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1986,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Union Square/Mid-Market","SoMa"],
	       "therapies": ["Cognitive Behavioral Therapy","Mindfulness/Meditation","Coaching"],
	       "days": ["Wednesday","Friday"],
	       "times": ["Mornings (7am - 11am)","Midday (11am - 2pm)","Afternoon (2pm - 5pm)","Evening (5pm - 8pm)"]},

	};

	module.exports = providers;


/***/ }
/******/ ]);