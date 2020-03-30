const { readFile, writeToFile, appendToFile } = require("../Tools/fileUtils");
const { convertJSONtoCSV } = require("./convertJSONtoCSV");
const { convertBasiasTxtToJSON } = require("./convertBasiasTxtToJSON");

function convertBasiasTextFilesToCSV(paths, globalFilePath = undefined) {
    var hasWriteGlobalFile = false;

    for (let path of paths) {
        let csv = readAndConvertBasiasFileToCSV(path)

        writeCSVToFile(path, csv);
        writeOrAppendToGlobalFile(globalFilePath, csv)
    }
}

exports.convertBasiasTextFilesToCSV = convertBasiasTextFilesToCSV;

///
/// Private
///

function readAndConvertBasiasFileToCSV(filename) {
    let fileContent = readFile(filename);

    if (fileContent == null || fileContent == '') {
        console.error("Cannot read file content of '" + filename + "'")
        return ""
    }

    let rawJSON = convertBasiasTxtToJSON(fileContent);
    if (rawJSON == '') {
        console.error("Cannot convert file '" + filename + "' to JSON")
        return ""
    }

    let csv = convertJSONtoCSV(rawJSON);
    return csv
}

///
/// Write to files
///

var hasWrite = false

function writeOrAppendToGlobalFile(filename, csv) {
    if (filename == '' || filename == undefined) { return }

    if (hasWrite) {
        appendCSVToFile(filename, csv);
    } else {
        writeCSVToFile(filename, csv);
        hasWrite = true;
    }
}

function writeCSVToFile(path, csv) {
    let newFilename = path.replace(/\..*$/, ".csv");
    let csvContent = csv.header + csv.body;
    writeToFile(newFilename, csvContent);
}

function appendCSVToFile(path, csv) {
    appendToFile(path, csv.body);
}
