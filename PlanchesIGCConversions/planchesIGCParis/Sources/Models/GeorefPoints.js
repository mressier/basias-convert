var { MapConfig, PixelConfig, FullPixelConfig } = require('./PixelConfig');

class GeorefPoints {
  constructor(file, board, pixel, map = null) {
    this.file = file;
    if (map == null) {
      this.map = this.getDefaultMapConfig(board);
    } else {
      this.map = map;
    }

    if (pixel instanceof PixelConfig) {
      this.points = this.getPoints(pixel);
    } else if (pixel instanceof FullPixelConfig && map == null) {
      this.points = this.getCornersPoints(pixel);
    } else if (pixel instanceof FullPixelConfig) {
      this.points = this.getPointsWithFullConfig(pixel);
    }
  }

  // - Compute Georef Points

  getCornersPoints(pixel) {
    const map = this.map;
    const enable = '1';

    var points = [
      new GeorefPoint(
        map.topLeftPixelX,
        map.topLeftPixelY,
        pixel.topLeftPixelX,
        pixel.topLeftPixelY,
        enable
      ),
      new GeorefPoint(
        map.bottomRightPixelX,
        map.topLeftPixelY,
        pixel.bottomRightPixelX,
        pixel.topLeftPixelY,
        enable
      ),
      new GeorefPoint(
        map.topLeftPixelX,
        map.bottomRightPixelY,
        pixel.topLeftPixelX,
        pixel.bottomRightPixelY,
        enable
      ),
      new GeorefPoint(
        map.bottomRightPixelX,
        map.bottomRightPixelY,
        pixel.bottomRightPixelX,
        pixel.bottomRightPixelY,
        enable
      )
    ];
    return points;
  }

  getPointsWithFullConfig(pixel) {
    const map = this.map;

    const xMapProgress = (map.bottomRightPixelX - map.topLeftPixelX) / 6;
    const xAxisProgress = {
      x: (pixel.topRightPixelX - pixel.topLeftPixelX) / 6,
      y: (pixel.topRightPixelY - pixel.topLeftPixelY) / 6
    };

    console.log('xPixelProgress: ', xAxisProgress);

    const yMapProgress = (map.bottomRightPixelY - map.topLeftPixelY) / 4;
    const yAxisProgress = {
      x: (pixel.bottomLeftPixelX - pixel.topLeftPixelX) / 4,
      y: (pixel.bottomLeftPixelY - pixel.topLeftPixelY) / 4
    };

    console.log('yPixelProgress: ', yAxisProgress);

    var points = [];

    for (var y = 0; y < 5; y++) {
      for (var x = 0; x < 7; x++) {
        const mapX = map.topLeftPixelX + x * xMapProgress;
        const mapY = map.topLeftPixelY + y * yMapProgress;

        const pixelX =
          pixel.topLeftPixelX + x * xAxisProgress['x'] + y * yAxisProgress['x'];

        const pixelY =
          pixel.topLeftPixelY + y * yAxisProgress['y'] + x * xAxisProgress['y'];

        const enable = (y + x) % 2 == 0 ? '1' : '0';
        points.push(new GeorefPoint(mapX, mapY, pixelX, pixelY, enable));
      }
    }
    return points;
  }

  getPoints(pixel) {
    const map = this.map;

    const xMapProgress = (map.bottomRightPixelX - map.topLeftPixelX) / 6;
    const xPixelProgress = (pixel.bottomRightPixelX - pixel.topLeftPixelX) / 6;

    console.log('xMapProgress: ', xMapProgress);
    console.log('xPixelProgress: ', xPixelProgress);

    const yMapProgress = (map.bottomRightPixelY - map.topLeftPixelY) / 4;
    const yPixelProgress = (pixel.bottomRightPixelY - pixel.topLeftPixelY) / 4;

    console.log('yMapProgress: ', yMapProgress);
    console.log('yPixelProgress: ', yPixelProgress);

    var points = [];

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 7; j++) {
        const mapX = map.topLeftPixelX + j * xMapProgress;
        const mapY = map.topLeftPixelY + i * yMapProgress;
        const pixelX = pixel.topLeftPixelX + j * xPixelProgress;
        const pixelY = pixel.topLeftPixelY + i * yPixelProgress;
        const enable = (i + j) % 2 == 0 ? '1' : '0';
        points.push(new GeorefPoint(mapX, mapY, pixelX, pixelY, enable));
      }
    }
    return points;
  }

  getDefaultMapConfig(board) {
    return new MapConfig(
      board.coordinates[0][0],
      board.coordinates[0][1],
      board.coordinates[2][0],
      board.coordinates[2][1]
    );
  }
}

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

exports.GeorefPoints = GeorefPoints;
