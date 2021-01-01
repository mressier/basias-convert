var { MapConfig } = require('./PixelConfig')

class GeorefPoints {
  constructor(file, board, pixel) {
    this.file = file
    this.points = this.getPoints(board, pixel)
  }

  getPoints(board, pixel) {
    const map = new MapConfig(
      board.coordinates[0][0],
      board.coordinates[0][1],
      board.coordinates[2][0],
      board.coordinates[2][1]
    )

    const xMapProgress = (map.bottomRightPixelX - map.topLeftPixelX) / 6
    const xPixelProgress = (pixel.bottomRightPixelX - pixel.topLeftPixelX) / 6

    console.log("xMapProgress: ", xMapProgress)
    console.log("xPixelProgress: ", xPixelProgress)

    const yMapProgress = (map.bottomRightPixelY - map.topLeftPixelY) / 4
    const yPixelProgress = (pixel.bottomRightPixelY - pixel.topLeftPixelY) / 4

    console.log("yMapProgress: ", yMapProgress)
    console.log("yPixelProgress: ", yPixelProgress)

    var points = []

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 7; j++) {
        const mapX = map.topLeftPixelX + j * xMapProgress
        const mapY = map.topLeftPixelY + i * yMapProgress
        const pixelX = pixel.topLeftPixelX + j * xPixelProgress
        const pixelY = pixel.topLeftPixelY + i * yPixelProgress
        const enable = ((i + j) % 2 == 0) ? "1" : "0"
        points.push(new GeorefPoint(mapX, mapY, pixelX, pixelY, enable))
      }
    }
    return points
  }
}

class GeorefPoint {
  constructor(mapX, mapY, pixelX, pixelY, enable) {
    this.mapX = mapX
    this.mapY = mapY
    this.pixelX = pixelX
    this.pixelY = pixelY
    this.enable = enable
    this.dX = 0.0
    this.dY = 0.0
    this.residual = 0.0
  }
}

exports.GeorefPoints = GeorefPoints
