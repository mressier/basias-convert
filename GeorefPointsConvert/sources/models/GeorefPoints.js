class GeorefPoint {
  constructor(mapX, mapY, pixelX, pixelY, enable) {
    this.mapX = mapX;
    this.mapY = mapY;
    this.pixelX = pixelX;
    this.pixelY = pixelY;
    this.enable = enable;
    this.dX = 0.0;
    this.dY = 0.0;
    this.residual = 0.0;
  }
}

exports.GeorefPoint = GeorefPoint;
