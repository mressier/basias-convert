var { GeorefPoints } = require('./GeorefPoints')

class FileConfig {
  constructor(object) {
    this.folder = object["folder"]
    this.planche = object["planche"]
    this.filename = object["file"]
  }

  getPoints(boards, pixels) {
    if (this.isNotAnImageFile()) { return null }

    const board = this.getMatchingBoard(boards)
    const pixel = this.getMatchingPixelConfig(pixels)

    if (board == undefined) {
      console.error("Cannot find board for file: ", this)
      return null
    }

    if (pixel == undefined) {
      console.error("Cannot find pixel for file: ", this)
      return null
    }

    return new GeorefPoints(this, board, pixel)
  }

  // ------------------- Tools ------------------- //

  isNotAnImageFile() {
    return (this.filename.endsWith('.points')
    || this.filename.endsWith('.psd')
    || this.filename.endsWith('.txt'))
  }

  getMatchingPixelConfig(configs) {
    const pixel = configs.filter(
      pixel => this.filename.toLowerCase().includes(pixel.name.toLowerCase())
    )
    if (pixel.length == 0) {
      return configs[0]
    } else {
      return pixel[0]
    }
  }

  getMatchingBoard(boards) {
    return boards.filter(board => this.planche.startsWith(board.planche))[0]
  }
}

exports.FileConfig = FileConfig
