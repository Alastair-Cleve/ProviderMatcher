jQuery.fn.tableToCSV = require('./jquery.tableToCSV.js');

var providers = require("./database.js");
var matchRange = 0.1;
var providerKeys = Object.keys(providers);
var todays_date = new Date();
var todays_year = todays_date.getFullYear();

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
    pair = pair.split(":");
    var key = pair[0].trim().toLowerCase()

    if (["solution-orientation", "structured", "active", "practical", "self-disclosure"].includes(key)) {
      spreadsheet_hash[key] = (parseInt(pair[1].trim().slice(0, -1)) * 0.01);
    } else {
      spreadsheet_hash[key] = pair[1].trim();
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
  $('#structured').val((spreadsheet_hash["structured"] || "0"));
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
