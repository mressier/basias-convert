#!/usr/bin/env python
from Properties import Properties
from Geometry import Geometry
import json

class PlancheFeature:

    def __init__(self, coordinatesPair, tile):
        self.type = "Feature"
        self.properties = Properties(tile).__dict__
        self.geometry = Geometry(coordinatesPair).__dict__