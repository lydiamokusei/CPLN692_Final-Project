
library(ggmap)
library(tidyverse)
library(sf)
library(dplyr)
library(rgdal)
library(sp)
library(maptools)

setwd("G:/Yinuo Yin/Study/Upenn/2018 Spring/CPLN 692/CPLN692-Final-Project/rawdata")

rawdata <- read.csv("RawData_StarbucksDD.csv")

starbucksANDdd <- filter(rawdata, CONAME == "DUNKIN' DONUTS" | CONAME == "STARBUCKS")

onlystarbucks <- filter(starbucksANDdd, CONAME == "STARBUCKS")

sbinPhilly <- filter(onlystarbucks, CITY16 == "PHILADELPHIA" )

ddinPhilly <- filter(starbucksANDdd, CITY16 == "PHILADELPHIA" & CONAME == "DUNKIN' DONUTS")

# OK, go with DD.
# Select needed columns
names(ddinPhilly)

dd <- ddinPhilly[,c(3,4,8,11,12,13,17,21, 23:26,28:42)]
dd <- na.omit(dd)
dd <- dd[(dd$HHs !=0),]

# Convert to shapefile
ddSF <- dd %>%
  mutate(lat = dd$latitude,
         lng = dd$longitude)
ddSF <- st_as_sf(ddSF, coords = c("longitude", "latitude"), crs = 4326)

# Write to GeoJSON
library(geojsonio)
library(spdplyr)
library(rmapshaper)

dd_json <- geojson_json(ddSF)

# Save it to a local file system.
geojson_write(dd_json, 
              file = "G:/Yinuo Yin/Study/Upenn/2018 Spring/CPLN 692/CPLN692-Final-Project/rawdata/dunkindonut.geojson")

# For js mapping
quantile(ddSF$SALES_VOL, c(0, .2, .4, .6, .8, 1))