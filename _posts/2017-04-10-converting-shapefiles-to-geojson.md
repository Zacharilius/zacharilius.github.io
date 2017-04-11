---
layout: post
title:  "Converting Shapefiles to GeoJson"
date:   2017-04-10 08:34:07 -0700
categories: Maps
page_css: blog_converting_shapefiles_to_geojson.css
page_js: blog_converting_shapefiles_to_geojson.js
---

## Intro
I love to to make maps on the webbut finding GeoJson data to make maps is somewhat difficult.
Typically, most geographic data is stored in Shapefiles. In order to create web maps,
we need data stored in GeoJson files. This blog post will show how to convert
your Shapefiles to GeoJson.

## What is a Shapefile
A Shapefile is a type of file that stores geospatial vector data (points, lines,
and polygons). Esri, the world's largest geospatial software company owns and regulates
the specifications for Shapefiles. Esri created Shapefiels to be used in their
Desktop GIS application.

## What is GeoJson
First off JSON stands for JavaScript Object Notation. Similarly to shapefiles, GeoJson
stores geospatial vector data format. However, instead of being controlled by a company,
it's regulated by Internet Engineering Task Force (IETF) and designed to be used in web mapping.


```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [123.0781, 48.5514]
  },
  "properties": {
    "name": "San Juan Island"
  }
}
```

The above GeoJson examples stores the location of the San Juan Islands.

## How to Convert

We will be using ogr2ogr command line tool to convert our Shapefile to GeoJSON.
The ogr2ogr tool is part of the Geospatial Data Abstraction Library (GDAL).

### Installation

#### Mac
Open terminal

Install Homebrew if you haven't installed it. There are many online tutorials for
installing Homebrew.

```bash
$ brew install gdal --HEAD
```

#### Linux
```bash
$ sudo apt-get install python-gdal
```

#### Check that you have gdal properly installed

```bash
$ ogr2ogr --version
GDAL 1.11.5, released 2016/07/01
````

Your *released* date will probably be different than mine but what's important is
that it has *GDAL* and then a release number.

### Sample Command
Now that we've confirmed the ogr2ogr command is installed on our machines. We're
ready to convert our shapefile into GeoJson.

If you don't have a shapefile, download my <a href="/static/blog/SanJuanIslandShapefile.zip" download="SanJuanIslandShapefile">sample shapefile</a>
and unzip it. Inside you will find a folder with 4 files that together make a shapefile. Move the
SanJuanIslandShapefile folder to your Desktop.

Navigate to your desktop and inside SanJuanIslandShapefile
``` bash
$ cd ~/Desktop/SanJuanIslandShapefile
```

Now run the ogr2ogr command to convert our shapefile to GeoJson.
``` bash
$ ogr2ogr -f GeoJSON -t_srs crs:84 SanJuanIsland.geojson SanJuanIsland.shp
```

You have now created your SanJuanIsland.geojson file on the desktop. Congrats!

<div id="map"></div>
