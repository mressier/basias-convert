#!/usr/bin/env python
import Tile

class Properties:

    id = 0

    def __init__(self, tile):
        self.id = Properties.id
        Properties.id += 1
        self.Planche = tile.toString()
