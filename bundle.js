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

	var providers = __webpack_require__(1);
	var matchRange = 1;
	var providerKeys = Object.keys(providers);
	var todays_date = new Date();
	var todays_year = todays_date.getFullYear();

	$('#sort').on("click", function () {
	  var matchScore = {};

	  var patientSelfDisclosure = parseInt($('#self-disclosure').val());
	  var patientSolutionOrientation = parseInt($('#solution-orientation').val());
	  var patientStructured = parseInt($('#structured').val());
	  var patientActive = parseInt($('#active').val());
	  var patientMentorScore = parseInt($('#mentor_score').val());
	  var patientAge = parseInt($('#age').val().trim());
	  var patientGender = $('#gender').val();
	  var genderMatters = $('#gender_matters').val();
	  var patientEthnicity = $('#ethnicity').val();
	  var ethnicityMatters = $('#ethnicity_matters').val();
	  var patientLGBT = $('#lgbt').val();
	  var patientLocation = $('#location').val()

	  // Testing for age input.
	  var reg = new RegExp('^[0-9]+$');
	  if (patientAge === "" || reg.test($('#age').val()) === false) {
	    $('#age').css("background-color", "lightblue");
	  } else {
	    $('#age').css("background-color", "transparent");
	  }

	  // Initial setup of matchScore object.
	  if (patientSelfDisclosure > 6) {
	    providerKeys.forEach(function(key) {
	      if (providers[key]["self-disclosure"] > 6) {
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
	    if (providers[key]["solution-orientation"] <= (patientSolutionOrientation + matchRange)
	      && providers[key]["solution-orientation"] >= (patientSolutionOrientation - matchRange)) {
	        matchScore[key]++;
	      }

	    if (providers[key]["structured"] <= (patientStructured + matchRange)
	      && providers[key]["structured"] >= (patientStructured - matchRange)) {
	        matchScore[key]++;
	      }

	    if (providers[key]["active"] <= (patientActive + matchRange)
	      && providers[key]["active"] >= (patientActive - matchRange)) {
	        matchScore[key]++;
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

	    if (genderMatters === "Yes") {
	      if (providers[key]["gender"] === patientGender) {
	        matchScore[key]++;
	      }
	    } else {
	      matchScore[key]++;
	    }

	    if (ethnicityMatters === "Yes") {
	      if (providers[key]["ethnicity"] === patientEthnicity) {
	        matchScore[key]++;
	      }
	    } else {
	      matchScore[key]++;
	    }

	    if (patientLGBT === "Yes") {
	      if (providers[key]["sexual_orientation"] !== "Straight") {
	        matchScore[key]++;
	      }
	    } else {
	      matchScore[key]++;
	    }

	    if (patientLocation === "All") {
	      matchScore[key]++;
	    } else if (providers[key]["locations"].includes(patientLocation)) {
	      matchScore[key]++;
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
	  var content = "<table><tr><th>Id</th>" +
	    "<th>Match Score</th>" +
	    "<th>Solution-Orientation</th>" +
	    "<th>Structured</th>" +
	    "<th>Active</th>" +
	    "<th>Practical</th>" +
	    "<th>Self-Disclosure</th>" +
	    "<th>Gender</th>" +
	    "<th>Birth Year</th>" +
	    "<th>Ethnicity</th>" +
	    "<th>Sexual Orientation</th>" +
	    "<th>Locations</th></tr>";

	  sorted.forEach(function(key) {
	    content += "<tr><td>" + key + "</td>" +
	      "<td width=7%>" + matchScore[key] + " / 9" + "</td>" +
	      "<td width=7%>" + providers[key]["solution-orientation"] + "</td>" +
	      "<td width=7%>" + providers[key]["structured"] + "</td>" +
	      "<td width=7%>" + providers[key]["active"] + "</td>" +
	      "<td width=7%>" + providers[key]["practical"] + "</td>" +
	      "<td width=7%>" + providers[key]["self-disclosure"] + "</td>" +
	      "<td>" + providers[key]["gender"] + "</td>" +
	      "<td>" + providers[key]["birth_year"] + "</td>" +
	      "<td>" + providers[key]["ethnicity"] + "</td>" +
	      "<td>" + providers[key]["sexual_orientation"] + "</td>" +
	      "<td>" + providers[key]["locations"].join(", ") + "</td>" +
	      "</tr>";
	  });
	  content += "</table>";
	  $('#root').append(content);

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var providers = {
	  1: { "solution-orientation": 6,
	       "structured": 6,
	       "active": 8,
	       "practical": 4,
	       "self-disclosure": 9,
	       "gender": "Male",
	       "birth_year": 1988,
	       "ethnicity": "White",
	       "sexual_orientation": "Straight",
	       "locations": ["Noe Valley"] },

	  2: { "solution-orientation": 6,
	       "structured": 5,
	       "active": 8,
	       "practical": 8,
	       "self-disclosure": 7,
	       "gender": "Female",
	       "birth_year": 1983,
	       "ethnicity": "White",
	       "sexual_orientation": "Straight",
	       "locations": ["Pacific Heights"] },

	  3: { "solution-orientation": 8,
	       "structured": 8,
	       "active": 8,
	       "practical": 7,
	       "self-disclosure": 7,
	       "gender": "Male",
	       "birth_year": 1963,
	       "ethnicity": "White",
	       "sexual_orientation": "Bisexual",
	       "locations": ["Pacific Heights"] },

	   4: {"solution-orientation":7,
	       "structured":6,
	       "active":9,
	       "practical":10,
	       "self-disclosure":7,
	       "gender":"Female",
	       "birth_year":1983,
	       "ethnicity":"White",
	       "sexual_orientation":"Straight",
	       "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

	   5:     {"solution-orientation":4,
	   	"structured":2,
	   	"active":6,
	   	"practical":5,
	   	"self-disclosure":1,
	   	"gender":"Female",
	   	"birth_year":1982,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Gay/Lesbian",
	   	"locations": ["Pacific Heights"]},

	   6:     {"solution-orientation":3,
	   	"structured":1,
	   	"active":7,
	   	"practical":9,
	   	"self-disclosure":5,
	   	"gender":"Female",
	   	"birth_year":1984,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Straight",
	   	"locations": ["Marina/Cow Hollow"]},

	   7:     {"solution-orientation":5,
	   	"structured":1,
	   	"active":5,
	   	"practical":6,
	   	"self-disclosure":2,
	   	"gender":"Male",
	   	"birth_year":1982,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Bisexual",
	   	"locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

	   8:     {"solution-orientation":3,
	   	"structured":5,
	   	"active":8,
	   	"practical":10,
	   	"self-disclosure":0,
	   	"gender":"Female",
	   	"birth_year":1976,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Gay/lesbian",
	   	"locations": ["Castro/Twin Peaks"]},

	   9:     {"solution-orientation":7,
	   	"structured":4,
	   	"active":8,
	   	"practical":10,
	   	"self-disclosure":3,
	   	"gender":"Male",
	   	"birth_year":1979,
	   	"ethnicity":"White",
	   	"sexual_orientation":"Straight",
	   	"locations": ["Marina/Cow Hollow"]},

	   10:    {"solution-orientation":8,
	   "structured":6,
	   "active":8,
	   "practical":10,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1958,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Pacific Heights"]},

	   11:    {"solution-orientation":4,
	   "structured":3,
	   "active":7,
	   "practical":8,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1958,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Richmond"]},

	   12:    {"solution-orientation":5,
	   "structured":0,
	   "active":7,
	   "practical":9,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1970,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Pacific Heights"]},

	   13:    {"solution-orientation":6,
	   "structured":3,
	   "active":8,
	   "practical":9,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1970,
	   "ethnicity":"White",
	   "sexual_orientation":"Unknown",
	   "locations": ["Pacific Heights","East Bay/Berkeley"]},

	   14:    {"solution-orientation":4,
	   "structured":3,
	   "active":5,
	   "practical":3,
	   "self-disclosure":1,
	   "gender":"Male",
	   "birth_year":1979,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

	   15:    {"solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":8,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1973,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Financial District","Castro/Twin Peaks"]},

	   16:    {"solution-orientation":7,
	   "structured":3,
	   "active":8,
	   "practical":10,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1969,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"]},

	   17:    {"solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":3,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1980,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"]},

	   18:    {"solution-orientation":5,
	   "structured":7,
	   "active":5,
	   "practical":9,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1979,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Straight",
	   "locations": ["East Bay/Berkeley","South Bay","Laurel Heights"]},

	   19:    {"solution-orientation":5,
	   "structured":3,
	   "active":7,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Male",
	   "birth_year":1965,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Unknown",
	   "locations": ["Financial District","Union Square/Mid-Market"]},

	   20:    {"solution-orientation":5,
	   "structured":3,
	   "active":7,
	   "practical":5,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1980,
	   "ethnicity":"White",
	   "sexual_orientation":"Bisexual",
	   "locations": ["Financial District","SoMa"]},

	   21:    {"solution-orientation":9,
	   "structured":5,
	   "active":9,
	   "practical":10,
	   "self-disclosure":8,
	   "gender":"Female",
	   "birth_year":1973,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","East Bay/Berkeley"]},

	   22:    {"solution-orientation":8,
	   "structured":5,
	   "active":8,
	   "practical":10,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   23:    {"solution-orientation":7,
	   "structured":2,
	   "active":8,
	   "practical":10,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1981,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Marina/Cow Hollow"]},

	   24:    {"solution-orientation":4,
	   "structured":4,
	   "active":8,"practical":7,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1988,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Pansexual",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   25:    {"solution-orientation":7,
	   "structured":6,
	   "active":8,
	   "practical":10,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1975,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Peninsula"]},

	   26:    {"solution-orientation":9,
	   "structured":8,
	   "active":10,
	   "practical":10,
	   "self-disclosure":7,
	   "gender":"Female",
	   "birth_year":1984,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Martinez"]},

	   27:    {"solution-orientation":8,
	   "structured":3,
	   "active":6,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1986,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   28:    {"solution-orientation":7,
	   "structured":5,
	   "active":7,
	   "practical":8,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1976,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"]},

	   29:    {"solution-orientation":5,
	   "structured":0,
	   "active":5,
	   "practical":10,
	   "self-disclosure":0,
	   "gender":"Female","birth_year":1976,
	   "ethnicity":"Black or African American",
	   "sexual_orientation":"Straight",
	   "locations": ["Lower Pacific Heights"]},

	   30:    {"solution-orientation":6,
	   "structured":3,
	   "active":8,
	   "practical":8,"self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1972,
	   "ethnicity":"White",
	   "sexual_orientation":"Gay/lesbian",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   31:    {"solution-orientation":5,
	   "structured":3,
	   "active":5,
	   "practical":7,
	   "self-disclosure":5,
	   "gender":"Female",
	   "birth_year":1985,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District","Union Square/Mid-Market"]},

	   32:    {"solution-orientation":5,
	   "structured":5,
	   "active":5,
	   "practical":8,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1985,
	   "ethnicity":"White",
	   "sexual_orientation":"Questioning/other",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   33:    {"solution-orientation":3,
	   "structured":4,
	   "active":7,
	   "practical":8,
	   "self-disclosure":5,
	   "gender":"Male",
	   "birth_year":1989,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Straight",
	   "locations": ["Mission/Dolores/Bernal Heights"]},

	   34:    {"solution-orientation":5,
	   "structured":4,
	   "active":9,
	   "practical":9,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1987,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"]},

	   35:    {"solution-orientation":5,
	   "structured":5,
	   "active":7,
	   "practical":7,
	   "self-disclosure":3,
	   "gender":"Female",
	   "birth_year":1982,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"]},

	   36:    {"solution-orientation":4,
	   "structured":2,
	   "active":5,
	   "practical":8,
	   "self-disclosure":2,
	   "gender":"Male",
	   "birth_year":1984,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Richmond"]},

	   37:    {"solution-orientation":5,
	   "structured":3,
	   "active":6,
	   "practical":8,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1989,
	   "ethnicity":"White",
	   "sexual_orientation":"Questioning/other",
	   "locations": ["Union Square/Mid-Market"]},

	   38:    {"solution-orientation":10,
	   "structured":7,
	   "active":10,
	   "practical":10,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1974,
	   "ethnicity":"Multiracial",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"]},

	   39:    {"solution-orientation":7,
	   "structured":3,
	   "active":8,
	   "practical":9,
	   "self-disclosure":3,
	   "gender":"Male",
	   "birth_year":1966,
	   "ethnicity":"White",
	   "sexual_orientation":"Unknown",
	   "locations": ["Union Square/Mid-Market"]},

	   40:    {"solution-orientation":8,
	   "structured":3,
	   "active":6,
	   "practical":9,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1978,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Castro/Twin Peaks"]},

	   41:    {"solution-orientation":4,
	   "structured":3,
	   "active":5,
	   "practical":7,
	   "self-disclosure":2,
	   "gender":"Female",
	   "birth_year":1978,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Financial District"]},

	   42:    {"solution-orientation":7,
	   "structured":3,
	   "active":7,
	   "practical":7,
	   "self-disclosure":4,
	   "gender":"Female",
	   "birth_year":1988,
	   "ethnicity":"Asian or Pacific Islander",
	   "sexual_orientation":"Bisexual",
	   "locations": ["Noe Valley"]},

	   43:    {"solution-orientation":6,
	   "structured":1,
	   "active":8,
	   "practical":9,
	   "self-disclosure":1,
	   "gender":"Female",
	   "birth_year":1951,
	   "ethnicity":"Unknown",
	   "sexual_orientation":"Unknown",
	   "locations": ["Pacific Heights"]},

	   44:    {"solution-orientation":6,
	   "structured":5,
	   "active":7,
	   "practical":9,
	   "self-disclosure":1,
	   "gender":"Female",
	   "birth_year":1966,
	   "ethnicity":"White",
	   "sexual_orientation":"Straight",
	   "locations": ["Richmond"]},

	   45:    {"solution-orientation":7,
	   "structured":7,
	   "active":7,
	   "practical":8,
	   "self-disclosure":6,
	   "gender":"Female",
	   "birth_year":1980,
	   "ethnicity":"Middle Eastern or North African",
	   "sexual_orientation":"Straight",
	   "locations": ["Union Square/Mid-Market"]}

	};

	module.exports = providers;


/***/ }
/******/ ]);