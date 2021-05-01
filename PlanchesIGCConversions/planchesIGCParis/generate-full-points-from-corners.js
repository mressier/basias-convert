var { createCSVObjects } = require('./Sources/Convert/csvFileToObjects');
var { FullPixelConfig } = require('./Sources/Models/PixelConfig');
var { MapConfig } = require('./Sources/Models/MapConfig');
var { GeorefPoints } = require('./Sources/Models/GeorefPoints');
var { objectsToCSV } = require('./Sources/Convert/objectsToCSVFile');

// Get a list of .tif.points files in input for which generate more points to georef

const files = process.argv.slice(2);
console.log(files);

const georefPointsOnFiles = files.map(file => {
  return {
    file: file,
    points: createCSVObjects(file, ',')
  };
});

const completeGeorefPointsOnFiles = georefPointsOnFiles.map(
  fileContent =>
    new GeorefPoints(
      fileContent.file,
      null,
      new FullPixelConfig()
        .initWithGeorefPointList(fileContent.points),
      new MapConfig(
        fileContent.points[0].mapX,
        fileContent.points[0].mapY,
        fileContent.points[3].mapX,
        fileContent.points[3].mapY
      )
    )
);

completeGeorefPointsOnFiles.forEach((item, i) => {
  objectsToCSV(item.file, item.points, ',');
});
