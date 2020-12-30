var { readFile } = require('../tools/fileUtils')
var { Board } = require('../models/Board')

function createCSVObject(keys, content) {
    var object = {}
    let count = Math.min(keys.length, content.length)

    for (let i = 0; i < count; i++) {
        let key = keys[i]
        object[key] = content[i]
    }

    return object
}

function createCSVObjects(csvFilename, newline = "\n\r", separator = ";") {
    let csvContent = readFile(csvFilename)

    let lines = csvContent.split(newline)
    let keys = lines[0].split(separator)

    let finalLines = lines.slice(1).filter(element => element != "")
    let objects = finalLines.map(
        element => createCSVObject(keys, element.split(separator))
    )

    return objects
}

function csvObjectsToBoardObject(csvObjects) {
    return csvObjects.map(object => new Board(object))
}

exports.createCSVObjects = createCSVObjects
exports.csvObjectsToBoardObject = csvObjectsToBoardObject
