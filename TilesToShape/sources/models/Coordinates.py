#!/usr/bin/env python

class Coordinates:
    def __init__(self, edges, tile):
        s,w,n,e = edges
        self.south = s
        self.west = w
        self.north = n
        self.east = e
        self.tile = tile

    def toString(self):
        return "s: {0}, w: {1}, n: {2}, e: {3}".format(self.south, self.west, self.north, self.east)
