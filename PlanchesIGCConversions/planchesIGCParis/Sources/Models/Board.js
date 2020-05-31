let SOUTH_INDEX = 3
let EAST_INDEX = 2
let NORTH_INDEX = 1
let WEST_INDEX = 0

class Board {
    constructor(csv) {
        this.name = csv.x + "-" + csv.y
        this.year = csv.editions
        this.coordinates = {
            "lambert": {
                WEST_INDEX: csv.leftlambert,
                NORTH_INDEX: csv.toplambert,
                EAST_INDEX: csv.rightlambert,
                SOUTH_INDEX: csv.lambert
            },
            "projection4326": {
                WEST_INDEX: csv.west,
                NORTH_INDEX: csv.north,
                EAST_INDEX: csv.east,
                SOUTH_INDEX: csv.south
            }
        }
    }

    shapeProjection4326Coordinates() {
        return this.shapeCoordinates(this.coordinates.projection4326)
    }

    shapeLambertCoordinates() {
        return this.shapeCoordinates(this.coordinates.lambert)
    }

    /// Convert 2points coordinated to complete set of coordinates for a shape
    shapeCoordinates(coordinates) {
        if (coordinates.length < 4) { return undefined }
        
        return [[[
            [coordinates.WEST_INDEX, coordinates.NORTH_INDEX],
            [coordinates.EAST_INDEX, coordinates.NORTH_INDEX],
            [coordinates.EAST_INDEX, coordinates.SOUTH_INDEX],
            [coordinates.WEST_INDEX, coordinates.SOUTH_INDEX],
            [coordinates.WEST_INDEX, coordinates.NORTH_INDEX],
        ]]]
    }
}

exports.Board = Board