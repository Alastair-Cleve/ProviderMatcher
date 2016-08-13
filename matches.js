jQuery.fn.tableToCSV = require('./jquery.tableToCSV.js');

var providers = require("./database.js");
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
  var content = "<table><thead><tr><th>Id</th>" +
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
    "<th>Locations</th></tr></thead><tbody>";

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
  content += "</tbody></table>";
  $('#root').append(content);
  $('table').floatThead();

});

$("#populate").click(function() {
  var spreadsheet_hash = {};
  var spreadsheet_values = $("#spreadsheet-copy-info").val();
  spreadsheet_values = spreadsheet_values.split("\n");
  console.log(spreadsheet_values);
  spreadsheet_values.forEach(function(pair) {
    pair = pair.split(":");
    spreadsheet_hash[pair[0].trim()] = pair[1].trim();
  });

  $('#self-disclosure').val(spreadsheet_hash["Self-Disclosure"]);
  $('#solution-orientation').val(spreadsheet_hash["Solution-Orientation"]);
  $('#structured').val(spreadsheet_hash["Structured"]);
  $('#active').val(spreadsheet_hash["Active"]);
  $('#mentor_score').val(spreadsheet_hash["Mentor Score"]);
  $('#age').val(spreadsheet_hash["Age"]);
  $('#gender').val(spreadsheet_hash["Gender"]);
  $('#gender_matters').val(spreadsheet_hash["Gender matters?"]);
  $('#ethnicity').val(spreadsheet_hash["Ethnicity"]);
  $('#ethnicity_matters').val(spreadsheet_hash["Ethnicity matters?"]);
  $('#lgbt').val(spreadsheet_hash["LGBT?"]);
  $('#location').val(spreadsheet_hash["Location"]);
  $('#practical').val(spreadsheet_hash["Practical"]);

  $('#sort').click();
});

$("#export-csv").click(function() {
  $("table").tableToCSV();
});

$("#modal").leanModal();
