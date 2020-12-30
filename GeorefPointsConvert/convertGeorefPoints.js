var { createCSVObjects, csvObjectsToBoardObject } = require('./sources/convert/csvFileToObjects')
var { objectsToCSV } = require('./sources/convert/objectToCSVFile')
var { writeToFile } = require('./sources/tools/fileUtils')

var files = process.argv.slice(2);
console.log('Files: ', files);

for (var i = 0; i < files.length; i++) {
  var file = files[i]
  var originalPoints = createCSVObjects(file, "\n", ",")
  var convertedPoints = originalPoints.map(element => getNewPointsByDoublePixels(element))
  var filename = file.replace("(300pp)", "")
  var csvContent = objectsToCSV(filename, convertedPoints, ",")
}

function getNewPointsByDoublePixels(object) {
  var newObject = object
  newObject["pixelX"] = parseFloat(object["pixelX"]) * 2
  newObject["pixelY"] = parseFloat(object["pixelY"]) * 2
  return newObject
}
