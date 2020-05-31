const { readFile, writeToFile } = require('./Sources/Tools/fileUtils')

function getJSONFromFile(file) {
    let fileContent = readFile(file)
    let fileContentJSON = JSON.parse(fileContent)
    return fileContentJSON
}

function writeFeature(properties, geometry) {
    let featureContent = {
        "type": "FeatureCollection",
        "name": "IGC Versailles - Etat cartographie",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3857" } },
        "features": [{
            "type": "Feature",
            "properties": properties,
            "geometry": geometry
        }]
    }

    let featureFilename = "./Result/" + properties["COMMUNE"] + " - " + properties["SECTION"] + ".geojson"

    console.log(featureFilename)
    writeToFile(featureFilename, JSON.stringify(featureContent))
}

function writeFeatures(features) {
    for (i = 0; i < features.length; i++) { 
        let feature = features[i]
        let properties = feature["properties"]
        let geometry = feature["geometry"]
        writeFeature(properties, geometry)
    }
}

let filename = './Resources/igc-versailles-cartographie.geojson'
let fileContentJSON = getJSONFromFile(filename)

let features = fileContentJSON["features"]

writeFeatures(features)