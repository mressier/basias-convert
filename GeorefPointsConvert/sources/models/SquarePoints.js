class SquarePoints {
  constructor(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.topLeftX = topLeftX
    this.topLeftY = topLeftY
    this.bottomRightX = bottomRightX
    this.bottomRightY = bottomRightY
  }

  getCorners() {
    return [
      {"x": this.topLeftX , "y": this.topLeftY},
      {"x": this.bottomRightX , "y": this.topLeftY},
      {"x": this.topLeftX , "y": this.bottomRightY},
      {"x": this.bottomRightX , "y": this.bottomRightY}
    ]
  }
}

exports.SquarePoints = SquarePoints
