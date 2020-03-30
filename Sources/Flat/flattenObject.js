function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if (Array.isArray(ob[i])) {
            toReturn[i] = flattenArray(ob[i])
        } else if ((typeof ob[i]) == 'object') {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

exports.flattenObject = flattenObject;

///
/// Private
/// 

function flattenArrayOfObject(array) {
    var floatArrayContent = ""

    for (var i in array) {
        var flatObject = flattenObject(array[i]);

        floatArrayContent += i + ":"

        for (var x in flatObject) {

            if (!flatObject.hasOwnProperty(x))
                continue;

            floatArrayContent += " " + x + "=" + flatObject[x] + "."
        }

        if (i < array.length - 1) { floatArrayContent += " | " }
    }

    return floatArrayContent
}

function flattenArrayOfBasicType(array) {
    var floatArrayContent = ""

    for (var i in array) {
        if (array[i] == '') { continue }
        if (floatArrayContent != '') { floatArrayContent += ", " }
        floatArrayContent += array[i]
    }

    return floatArrayContent
}

function flattenArray(array) {
    if (array.length == 0) { return "" }

    if (typeof(array[0]) != 'object') {
        return flattenArrayOfBasicType(array)
    } else {
        return flattenArrayOfObject(array)
    }
}
