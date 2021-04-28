var { geoJsonToObject } = require('./Sources/Convert/geoJsonToObject');
var { writeToFile, createDirectory } = require('./Sources/Tools/fileUtils');
var { createCSVObjects } = require('./Sources/Convert/csvFileToObjects');
var { objectsToCSV } = require('./Sources/Convert/objectsToCSVFile');
var { GeoJson } = require('./Sources/Models/GeoJson');
var { SimpleBoard } = require('./Sources/Models/SimpleBoard');
var { FullPixelConfig } = require('./Sources/Models/PixelConfig');
var { FileConfig } = require('./Sources/Models/FileConfig');
var { GeorefPoints } = require('./Sources/Models/GeorefPoints');

const sourceFileGeoJson = './Resources/Liste des Planches IGC v4.geojson';
const sourceFileFilename =
  './Resources/generate-points-config/planches-filename.csv';
const sourceFilePixelConfig =
  './Resources/generate-points-config/planches-pixel-config.csv';
const sourceFileFullPixelConfig =
  './Resources/generate-points-config/planches-pixel-full-config.csv';

const destFolder = './planches-igc-paris-points/';

// Get boards with map points
const json = geoJsonToObject(sourceFileGeoJson);
const geoJson = new GeoJson(json);
const boards = geoJson.features.map(element => new SimpleBoard(element));

// Get atreyu config full with pixel points
// Config full should have 4 points for each corners
const pixelConfigObjects = createCSVObjects(sourceFileFullPixelConfig);
const pixelConfigs = pixelConfigObjects.map(
  pixel => new FullPixelConfig(pixel)
);
const atreyuConfig = pixelConfigs.filter(config => config.name == 'Atreyu');

// Create a custom file config for each board because there is no reference of output
const filesConfig = boards.map(
  board =>
    new FileConfig({
      folder: 'Atreyu',
      planche: board.planche,
      file: board.planche + ' (Atreyu)'
    })
);

// Create points combinaison with boards and map points
const allPoints = filesConfig.map(file => file.getPoints(boards, pixelConfigs));

if (!createDirectory(destFolder)) {
  return;
}

// Write points to files
for (var i = 0; i < allPoints.length; i++) {
  const item = allPoints[i];

  if (item == null) {
    continue;
  }

  const folder = destFolder + item.file.folder;
  const plancheFolder = folder + '/' + item.file.planche;
  const filename = plancheFolder + '/' + item.file.filename + '.points';

  if (!createDirectory(folder)) {
    break;
  }
  if (!createDirectory(plancheFolder)) {
    break;
  }

  // console.log("Item: ", item)

  objectsToCSV(filename, item.points, ',');
}
