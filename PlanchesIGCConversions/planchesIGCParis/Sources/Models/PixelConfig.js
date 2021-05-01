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

  initWithGeorefPointList(points) {
    this.topLeftPixelX = points[0].pixelX,
    this.topLeftPixelY = points[0].pixelY,
    this.topRightPixelX = points[1].pixelX,
    this.topRightPixelY = points[1].pixelY,
    this.bottomLeftPixelX = points[2].pixelX,
    this.bottomLeftPixelY = points[2].pixelY,
    this.bottomRightPixelX = points[3].pixelX,
    this.bottomRightPixelY = points[3].pixelY
  }
}

exports.PixelConfig = PixelConfig
exports.FullPixelConfig = FullPixelConfig
