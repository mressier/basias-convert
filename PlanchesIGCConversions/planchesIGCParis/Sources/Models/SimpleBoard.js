class SimpleBoard {
  constructor(geoJsonFeature) {
    this.planche = geoJsonFeature.properties.planche
    this.coordinates = geoJsonFeature.geometry.coordinates
  }
}

exports.SimpleBoard = SimpleBoard
