#!/usr/bin/env python

class Geometry:

    def __init__(self, coordinatesPair):
        self.type = "MultiPolygon"
        self.coordinates = [[
            coordinatesPair
        ]]