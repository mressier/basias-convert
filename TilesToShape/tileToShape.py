#!/usr/bin/env python
from sources import tilenames as tileUtils
from sources.models.Coordinates import Coordinates
from sources.models.Tile import Tile
from sources.models.PlancheFeature import PlancheFeature
from sources.models.PlancheFeatureCollection import PlancheFeatureCollection
import json

tileZ = 8
nwTile = Tile(129, 87, tileZ)
seTile = Tile(131, 89, tileZ)

def getTileXYForNextLevel(nwEdge, seEdge, nextLevel):
    (x, y) = tileUtils.tileXY(nwEdge.north, nwEdge.west, nextLevel)
    nwTile = Tile(x, y, nextLevel)

    (x, y) = tileUtils.tileXY(seEdge.south, seEdge.east, nextLevel)
    seTile = Tile(x, y, nextLevel)

    return (nwTile, seTile)

def getAllCoordinatesFromTileToTile(nwTile, seTile):
    coordinates = []
    zoomLevel = nwTile.zoom

    for x in range(nwTile.x, seTile.x):
        for y in range(nwTile.y, seTile.y):
            edge = tileUtils.tileEdges(x, y, zoomLevel)
            coordinate = Coordinates(edge, Tile(x, y, zoomLevel))
            coordinates.append(coordinate)

    return coordinates

def fileContentForCoordinates(coordinates, zoomLevel):
    planches = []
    for coordinate in coordinates:
        # print("coordinate : {0}").format(coordinate.toString())
        coordinatesPairs = [
            [coordinate.west, coordinate.north],
            [coordinate.east, coordinate.north],
            [coordinate.east, coordinate.south],
            [coordinate.west, coordinate.south],
            [coordinate.west, coordinate.north]
        ]

        planche = PlancheFeature(coordinatesPairs, coordinate.tile)
        planches.append(planche.__dict__)

    fileContent = PlancheFeatureCollection(planches)
    string = json.dumps(fileContent.__dict__)
    return string

def writeFileContent(fileContent, zoomLevel):
    filename = "tile-zoom-{0}.geojson".format(zoomLevel)
    print(filename)

    f = open(filename, "a")
    f.write(fileContent)
    f.close()
    
if __name__ == "__main__":

    zoomLevel = 8
    while zoomLevel < 17:
        coordinates = getAllCoordinatesFromTileToTile(nwTile, seTile)

        fileContent = fileContentForCoordinates(coordinates, zoomLevel)
        writeFileContent(fileContent, zoomLevel)

        nwEdge = coordinates[0]
        seEdge = coordinates[len(coordinates) - 1]

        print("nw : {0}").format(nwEdge.toString())
        print("se : {0}").format(seEdge.toString())

        zoomLevel += 1
        (nwNextTile, seNextTile) = getTileXYForNextLevel(nwEdge, seEdge, zoomLevel)
        print("tile n/w : {0}").format(nwNextTile.toString())
        print("tile s/e : {0}").format(seNextTile.toString())

        nwTile = nwNextTile
        seTile = seNextTile