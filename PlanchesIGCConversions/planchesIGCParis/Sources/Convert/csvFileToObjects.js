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

function createCSVObjects(csvFilename, separator = ";") {
    let csvContent = readFile(csvFilename)

    let lines = csvContent.split("\r\n")
    let keys = lines[0].split(separator)

    let objects = lines.map(
        element => createCSVObject(keys, element.split(separator))
    )
    
    return objects
}

function csvObjectsToBoardObject(csvObjects) {
    return csvObjects.map(object => new Board(object))
}

exports.createCSVObjects = createCSVObjects
exports.csvObjectsToBoardObject = csvObjectsToBoardObject
