var { readFile } = require('../Tools/fileUtils')
var { Board } = require('../Models/Board')

function createCSVObject(keys, content) {
    var object = {}
    let count = Math.min(keys.length, content.length)

    for (let i = 0; i < count; i++) {
        let key = keys[i]
        object[key] = content[i]
    }

    return object
}

function createCSVObjects(csvFilename, separator = ";", lineSeparator = "\r\n") {
    let csvContent = readFile(csvFilename)

    let lines = csvContent.split(lineSeparator)
    let keys = lines[0].split(separator)

    let content = lines.slice(1).filter(element => element != "")
    let objects = content.map(
        element => createCSVObject(keys, element.split(separator))
    )

    return objects
}

function csvObjectsToBoardObject(csvObjects) {
    return csvObjects.map(object => new Board(object))
}

exports.createCSVObjects = createCSVObjects
exports.csvObjectsToBoardObject = csvObjectsToBoardObject
