#!/usr/bin/env python
import PlancheFeature

class PlancheFeatureCollection:

    def __init__(self, features):
        self.type = "FeatureCollection"
        self.name = "World Tiles"
        self.crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::4326" }}
        self.features = features
