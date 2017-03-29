#!/bin/sh
COLOR='#3498db'
convert -background $COLOR -density 40 -resize 40x icon.svg 40.png
convert -background $COLOR -density 58 -resize 58x icon.svg 58.png
convert -background $COLOR -density 60 -resize 60x icon.svg 60.png
convert -background $COLOR -density 80 -resize 80x icon.svg 80.png
convert -background $COLOR -density 87 -resize 87x icon.svg 87.png
convert -background $COLOR -density 120 -resize 120x icon.svg 120.png
convert -background $COLOR -density 180 -resize 180x icon.svg 180.png
