var { createCSVObjects } = require('./sources/convert/csvFileToObjects')

var source = process.argv.slice(2)[0];
console.log('Source: ', source);

var fileContent = createCSVObjects(source, "\n", ";")
console.log('File content: ', fileContent);

const commands = fileContent.map((file) => {
  const points = createCSVObjects(file.points, "\n", ",")
  console.log(points)

  // gcp command: -gcp pixelX pixelY mapX mapY
  const gcpCommand = points.map(point => {
      return "-gcp "
      + parseFloat(point.pixelX).toFixed(3) + " "
      + parseFloat(point.pixelY).toFixed(3) + " "
      + point.mapX + " "
      + point.mapY
  })

  return "script.bat \""
  + gcpCommand + "\" "
  + file.tif + " "
  + file.json
});

console.log(commands)
