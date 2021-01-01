class GeoJson {
  constructor(json) {
    this.type = json["type"]
    this.name = json["name"]
    this.features = json["features"].map(element => new GeoJsonFeature(element))
  }

}

class GeoJsonFeature {
  constructor(json) {
    this.geometry = new GeoJsonGeometry(json["geometry"])
    this.properties = new GeoJsonProperties(json["properties"])
  }
}

class GeoJsonGeometry {
  constructor(json) {
    this.type = json["type"]
    this.coordinates = json["coordinates"][0][0]
  }
}

class GeoJsonProperties {
  constructor(json) {
    this.planche = json["Planche"]
    this.year = json["Année"]
    this.geology = json["Géologie"]
    this.source = json["Source"]
    this.cached = json["Cache"]
  }
}

exports.GeoJson = GeoJson
