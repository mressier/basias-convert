#!/usr/bin/env python

class Tile:
    def __init__(self, x, y, zoom):
        self.x = x
        self.y = y
        self.zoom = zoom

    def toString(self):
        return "z: {0} | x: {1} | y: {2}".format(self.zoom, self.x, self.y)