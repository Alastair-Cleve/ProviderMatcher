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
  $('#patient-comments').val("")
  $('#lean_overlay').click();
  $('#patient-name').css("background-color", "transparent");

};
