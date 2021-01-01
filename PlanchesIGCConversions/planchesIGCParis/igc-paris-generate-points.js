var { geoJsonToObject } = require('./Sources/Convert/geoJsonToObject')
var { writeToFile, createDirectory } = require('./Sources/Tools/fileUtils')
var { createCSVObjects } = require('./Sources/Convert/csvFileToObjects');
var { objectsToCSV } = require('./Sources/Convert/objectsToCSVFile');
var { GeoJson } = require('./Sources/Models/GeoJson')
var { SimpleBoard } = require('./Sources/Models/SimpleBoard')
var { PixelConfig } = require('./Sources/Models/PixelConfig')
var { FileConfig } = require('./Sources/Models/FileConfig')
var { GeorefPoints } = require('./Sources/Models/GeorefPoints')

const sourceFileGeoJson = './Resources/Liste des Planches IGC v4.geojson'
const sourceFileFilename = "./Resources/generate-points-config/planches-filename.csv"
const sourceFilePixelConfig = "./Resources/generate-points-config/planches-pixel-config.csv"

const destFolder = './planches-igc-paris-points/'

// Get boards with map points
const json = geoJsonToObject(sourceFileGeoJson)
const geoJson = new GeoJson(json)
const boards = geoJson.features.map(element => new SimpleBoard(element))

// Get config with pixel points
const pixelConfigObjects = createCSVObjects(sourceFilePixelConfig, ";")
const pixelConfigs = pixelConfigObjects.map(pixel => new PixelConfig(pixel))

// Get files for which generate points
const files = createCSVObjects(sourceFileFilename)
const filesConfig = files.map(file => new FileConfig(file))

// Create points combinaison with boards and map points
const allPoints = filesConfig.map(file =>
  file.getPoints(boards, pixelConfigs)
)

// console.log("Points", allPoints);

if (!createDirectory(destFolder)) {
  return
}

// Write points to files
for (var i = 0; i < allPoints.length; i++) {
  const item = allPoints[i]

  if (item == null) { continue }

  const folder = destFolder + item.file.folder
  const plancheFolder = folder + "/" + item.file.planche
  const filename = plancheFolder + "/" + item.file.filename + ".points"

  if (!createDirectory(folder)) { break }
  if (!createDirectory(plancheFolder)) { break }

  // console.log("Item: ", item)

  objectsToCSV(filename, item.points, ",")
}
