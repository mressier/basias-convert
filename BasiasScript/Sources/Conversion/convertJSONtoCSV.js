const { convertFlatObjectToCSV } = require("../Flat/convertFlatObjectToCSV");
const { convertJSONtoFlatJSON } = require("./convertJSONtoFlatJSON");

function convertJSONtoCSV(json, separator = ";", lineSeparator = "\r\n") {
    var flatJSON = convertJSONtoFlatJSON(json)
    
    flatJSON = replaceAlreadyPlacedSeparator(flatJSON, separator, ",")

    var header = extractHeaderFromFlattenJSON(flatJSON, separator, lineSeparator)
    var body = convertFlatObjectToCSV(flatJSON, separator, lineSeparator)

    return {header: header, body: body}
}

exports.convertJSONtoCSV = convertJSONtoCSV;

///
/// Private
///

function extractHeaderFromFlattenJSON(flattenJSON, separator, lineSeparator) {
    let firstItem = flattenJSON[0]
    var headers = ""

    for (var field in firstItem) {
        if (headers != '') { headers += separator }
        headers += field
    }

    headers += lineSeparator
    return headers
}

function replaceAlreadyPlacedSeparator(flattenJSON, separator, replacer) {
    for (i in flattenJSON) {
        for (object in flattenJSON[i]) {
            var content = flattenJSON[i][object]

            if (content == undefined) {
                content = ''
            } else {
                content = content.replace(separator, replacer)
            }
            
            flattenJSON[i][object] = content
        }
    }
    return flattenJSON
}