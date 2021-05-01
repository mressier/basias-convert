var { createCSVObjects } = require('./sources/convert/csvFileToObjects')
var { GeorefPoint, GeorefPoints } = require('./sources/models/GeorefPoints')
var { MapConfig } = require('./sources/models/MapConfig')
var { FullPixelConfig } = require('./sources/models/PixelConfig')
var { objectsToCSV } = require('./Sources/Convert/objectsToCSVFile');

// Get a csv with format
// file;Xpas;Ypas;Xcoord;Ycoord;TopLeft-X;TopLeft-Y;BottomRight-X;BottomRight-Y
// this is the list of .tif files for which generates set of points

var source = process.argv.slice(2)[0];
console.log('Source: ', source);

var fileContent = createCSVObjects(source, ";", "\r\n")
console.log("FileContent: ", fileContent)

// Convert file content into a list of georef point for each file
const georefPointsOnFiles = fileContent.map(item => {
  const mapConfig = new MapConfig(
    item["TopLeft-X"],
    item["TopLeft-Y"],
    item["BottomRight-X"],
    item["BottomRight-Y"]
  )

  const points = mapConfig.getCorners().map(corner =>
    new GeorefPoint(
      corner.x, // mapX
      corner.y, // mapY
      (corner.x - item.Xcoord) / item.Xpas, // pixelX
      ((corner.y - item.Ycoord) / item.Ypas) * -1, // pixelY
      '1'
    )
  )

  return {
    'file': item.file,
    'map': mapConfig,
    'points': points
  }
});

console.log(georefPointsOnFiles)
console.log("-----------------")

const completeGeorefPointsOnFiles = georefPointsOnFiles.map(
  fileContent => {
    const fullPixelConfig = new FullPixelConfig({});
    fullPixelConfig.initWithGeorefPointList(fileContent.points)

    return new GeorefPoints(
      fileContent.file,
      null,
      fullPixelConfig,
      new MapConfig(
        fileContent.points[0].mapX,
        fileContent.points[0].mapY,
        fileContent.points[3].mapX,
        fileContent.points[3].mapY
      )
    )
  }
);


completeGeorefPointsOnFiles.forEach((item, i) => {
  console.log(item.file)
  console.log(item.points)
  objectsToCSV(item.file + ".points", item.points, ',');
});

// console.log(completeGeorefPointsOnFiles)
