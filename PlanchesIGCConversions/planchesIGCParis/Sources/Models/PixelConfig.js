class PixelConfig {
  constructor(object) {
    this.name = object["name"]
    this.topLeftPixelX = parseFloat(object["top-pixelX"])
    this.topLeftPixelY = parseFloat(object["top-pixelY"])
    this.bottomRightPixelX = parseFloat(object["bottom-pixelX"])
    this.bottomRightPixelY = parseFloat(object["bottom-pixelY"])
  }
}

class MapConfig {
    constructor(topLeftPixelX, topLeftPixelY, bottomRightPixelX, bottomRightPixelY) {
      this.topLeftPixelX = parseInt(topLeftPixelX)
      this.topLeftPixelY = parseInt(topLeftPixelY)
      this.bottomRightPixelX = parseInt(bottomRightPixelX)
      this.bottomRightPixelY = parseInt(bottomRightPixelY)
    }
}

exports.PixelConfig = PixelConfig
exports.MapConfig = MapConfig
