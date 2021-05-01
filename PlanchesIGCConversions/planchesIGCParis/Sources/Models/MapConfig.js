class MapConfig {
    constructor(topLeftPixelX, topLeftPixelY, bottomRightPixelX, bottomRightPixelY) {
      this.topLeftPixelX = parseInt(topLeftPixelX)
      this.topLeftPixelY = parseInt(topLeftPixelY)
      this.bottomRightPixelX = parseInt(bottomRightPixelX)
      this.bottomRightPixelY = parseInt(bottomRightPixelY)
    }

    getCorners() {
      return [
        {"x": this.topLeftPixelX , "y": this.topLeftPixelY},
        {"x": this.bottomRightPixelX , "y": this.topLeftPixelY},
        {"x": this.topLeftPixelX , "y": this.bottomRightPixelY},
        {"x": this.bottomRightPixelX , "y": this.bottomRightPixelY}
      ]
    }
}

exports.MapConfig = MapConfig
