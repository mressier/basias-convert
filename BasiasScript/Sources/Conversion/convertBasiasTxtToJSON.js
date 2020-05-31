function convertBasiasTxtToJSON(fileContent = "") {
    try {
        let readable = convertBasiasTxtToReadableJSON(fileContent)
        let json = JSON.parse(readable)
        return json;
    } catch(error) {
        return null
    }
}

exports.convertBasiasTxtToJSON = convertBasiasTxtToJSON;

///
/// Private
///

function addJSONBrackets(fileContent) {

    let pattern = /\}$[\s\S]{1,2}\{/gm;
    let jsonContent = fileContent.replace(pattern, "},\n{");
    let jsonComplete = "[" + jsonContent + "]";

    return jsonComplete
}

function removeExtraNewLine(fileContent) {
    let pattern = /\\n/g
    let json = fileContent.replace(pattern, " ")

    return json
}

function convertBasiasTxtToReadableJSON(fileContent = "") {
    if (fileContent === null || fileContent === undefined || fileContent == '') {
        return "";
    }
    var jsonWithBracket = addJSONBrackets(fileContent)
    var json = removeExtraNewLine(jsonWithBracket)
    return json
}
