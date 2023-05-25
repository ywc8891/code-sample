function flattenObject(obj) {
  var result = {};
  for (var key in obj) {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      var temp = flattenObject(obj[key]);
      for (var k in temp) {
        result[key + '.' + k] = temp[k];
      }
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

function outputJSONToSheet(jsonData) {
  // Get the sheet where you want to output the data
  var sheet = SpreadsheetApp.getActiveSheet();

  // Flatten all the objects in the jsonData array
  var flattenedData = jsonData.map(flattenObject);

  // Get all the unique keys from all the flattened objects
  var headers = [...new Set(flattenedData.flatMap(Object.keys))];

  // Create an array of values from the flattened data
  var values = flattenedData.map(function(obj) {
    return headers.map(function(header) {
      return obj[header] || "";
    });
  });

  // Add the headers as the first row of the values array
  values.unshift(headers);

  // Output the values array to the sheet
  sheet.getRange(1, 1, values.length, headers.length).setValues(values);
}
