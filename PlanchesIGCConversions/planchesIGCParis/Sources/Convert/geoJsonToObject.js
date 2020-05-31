var { readFile } = require('../Tools/fileUtils')

function geoJsonToObject(filename) {
    let content = readFile(filename)
    let object = JSON.parse(content)
    return object
}

function findBoardWithName(boards, name) {
    let boardsWithName = boards.filter((value, index, array) => value.name == name)
    if (boardsWithName == undefined || boardsWithName.length == 0) { return undefined }
    return boardsWithName[0]
}

function roundCoordinates(planche) {
    let coordinates = planche["geometry"]["coordinates"][0][0]
    let rounded = coordinates.map( coordinates =>
        coordinates.map(element => Math.round(element))
    )
    return rounded
}

function updateGeoJSONCoordinatesWithCSV(geoJsonObjects, boards) {
    for (planche of geoJsonObjects["features"]) {
        const properties = planche["properties"]
        const name = properties["Planche"]

        console.log("Update planche: " + name)

        let board = findBoardWithName(boards, name)
        if (board == undefined) {
            console.error("BOARD NOT FOUND : " + name)
            // With lambert, can round coordinates
            // let roundedCoordinates = roundCoordinates(planche)
            // planche["geometry"]["coordinates"] = [[roundedCoordinates]]
        } else {
            planche["geometry"]["coordinates"] = board.shapeLambertCoordinates()
        }
        
    }

    return geoJsonObjects
}

exports.geoJsonToObject = geoJsonToObject
exports.updateGeoJSONCoordinatesWithCSV = updateGeoJSONCoordinatesWithCSV