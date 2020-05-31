function convertFlatObjectToCSV(flatObject, separator, lineSeparator) {
    var array = flatObject;
    var str = '';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '')
                line += separator;
            line += array[i][index];
        }
        str += line + lineSeparator;
    }
    return str;
}

exports.convertFlatObjectToCSV = convertFlatObjectToCSV;
