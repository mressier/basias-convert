var { writeToFile } = require('../tools/fileUtils')

function objectsToCSVString(objects, separator = ";") {
  let keys = Object.keys(objects[0])
  let header = keys.join(separator)
  let content = objects.map(element =>
    keys.map(key => element[key]).join(separator)
  )
  let contentString = content.join("\n")
  return header + "\n" + contentString
}

function objectsToCSV(filename, objects, separator) {
    let content = objectsToCSVString(objects, separator)
    writeToFile(filename, content)
}

exports.objectsToCSVString = objectsToCSVString
exports.objectsToCSV = objectsToCSV
