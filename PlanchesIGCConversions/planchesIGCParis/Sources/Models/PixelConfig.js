class PixelConfig {
  constructor(object) {
    this.name = object["name"]
    this.topLeftPixelX = parseFloat(object["top-pixelX"])
    this.topLeftPixelY = parseFloat(object["top-pixelY"])
    this.bottomRightPixelX = parseFloat(object["bottom-pixelX"])
    this.bottomRightPixelY = parseFloat(object["bottom-pixelY"])
  }
}

class FullPixelConfig {
  constructor(object) {
    this.name = object["name"]
    this.topLeftPixelX = parseFloat(object["top-left-pixelX"])
    this.topLeftPixelY = parseFloat(object["top-left-pixelY"])

    this.topRightPixelX = parseFloat(object["top-right-pixelX"])
    this.topRightPixelY = parseFloat(object["top-right-pixelY"])

    this.bottomLeftPixelX = parseFloat(object["bottom-left-pixelX"])
    this.bottomLeftPixelY = parseFloat(object["bottom-left-pixelY"])

    this.bottomRightPixelX = parseFloat(object["bottom-right-pixelX"])
    this.bottomRightPixelY = parseFloat(object["bottom-right-pixelY"])
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
exports.FullPixelConfig = FullPixelConfig
exports.MapConfig = MapConfig
