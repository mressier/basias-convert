function filterBasiasValidFilename(parameters) {
    var validParameters = parameters.filter(checkPath)
    return validParameters
}

exports.filterBasiasValidFilename = filterBasiasValidFilename

///
/// Private
///

function checkPath(path) {
    return path.endsWith(".txt")
}
