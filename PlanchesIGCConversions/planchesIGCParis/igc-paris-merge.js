var { createCSVObjects, csvObjectsToBoardObject } = require('./Sources/Convert/csvFileToObjects')
var { geoJsonToObject, updateGeoJSONCoordinatesWithCSV } = require('./Sources/Convert/geoJsonToObject')
var { writeToFile } = require('./Sources/Tools/fileUtils')

const sourceFileGeoJson = './Resources/planches-igc-portail-lambert1.geojson'
const sourceFileCSV = './Resources/planches-igc-portail.csv'

const destinationFileGeoJson = './planches-onion-lambert1.geojson'

const csvObjects = createCSVObjects(sourceFileCSV)
const boards = csvObjectsToBoardObject(csvObjects)

const geoJsonObjects = geoJsonToObject(sourceFileGeoJson)

updatedGeoJSONObjects = updateGeoJSONCoordinatesWithCSV(geoJsonObjects, boards)

writeToFile(destinationFileGeoJson, JSON.stringify(updatedGeoJSONObjects))
