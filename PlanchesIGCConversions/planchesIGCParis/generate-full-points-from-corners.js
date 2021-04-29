var { createCSVObjects } = require('./Sources/Convert/csvFileToObjects');
var { MapConfig, FullPixelConfig } = require('./Sources/Models/PixelConfig');
var { GeorefPoints } = require('./Sources/Models/GeorefPoints');
var { objectsToCSV } = require('./Sources/Convert/objectsToCSVFile');

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
      (pixel = new FullPixelConfig({
        'top-left-pixelX': fileContent.points[0].pixelX,
        'top-left-pixelY': fileContent.points[0].pixelY,
        'top-right-pixelX': fileContent.points[1].pixelX,
        'top-right-pixelY': fileContent.points[1].pixelY,
        'bottom-left-pixelX': fileContent.points[2].pixelX,
        'bottom-left-pixelY': fileContent.points[2].pixelY,
        'bottom-right-pixelX': fileContent.points[3].pixelX,
        'bottom-right-pixelY': fileContent.points[3].pixelY
      })),
      (map = new MapConfig(
        fileContent.points[0].mapX,
        fileContent.points[0].mapY,
        fileContent.points[3].mapX,
        fileContent.points[3].mapY
      ))
    )
);

completeGeorefPointsOnFiles.forEach((item, i) => {
  objectsToCSV(item.file, item.points, ',');
});
