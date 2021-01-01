var fs = require('fs');

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch (error) {
        return null;
    }
}

function writeToFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content)
    } catch(error) {
        console.error(error)
    }
}

function createDirectory(directoryPath) {
    if (fs.existsSync(directoryPath)) {
      return true
    }

    fs.mkdirSync(directoryPath)
    return true
}

function appendToFile(filePath, content) {
    try {
        fs.appendFileSync(filePath, content)
    } catch(error) {
        console.error(error)
    }
}

exports.readFile = readFile
exports.writeToFile = writeToFile
exports.appendToFile = appendToFile
exports.createDirectory = createDirectory
