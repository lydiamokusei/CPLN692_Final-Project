/* =====================
Setup Map
===================== */
//disable zoomControl when initializing map (which is topleft by default)
var map = L.map('map', {
  center: [40.000, -75.16],
  zoom: 12,
  zoomControl: false
});

var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

L.control.zoom({
    position:'topright'
}).addTo(map);

/* =====================
Define Variables
===================== */
var featureGroup;
var locationMarker;
var generatedRoute;
var filterSelection;
var customSelection;

/* =====================
Import Data
===================== */
// Farmers market data
// Modified using geojson.io
var dataset = "https://raw.githubusercontent.com/norayin/CPLN692-Final-Project/master/dunkindonut.geojson";
var parsedData;
$.ajax(dataset).done(function(data){
  parsedData = JSON.parse(data);
});

// Add philly boundary
var phillyBoundary = "https://gist.githubusercontent.com/anonymous/eb5a6386acba87e14f8f4262cb4d0488/raw/7d073e2bab2e0a2cb55e1b19e0b9439bc833c886/boundary.json";
var boundary;
$.ajax(phillyBoundary).done(function(data){
  boundary = JSON.parse(data);
});

/* =====================
Initiate the web page
===================== */
$(document).ready(function() {
  // Philly boundary
  $.ajax(phillyBoundary).done(function(data) {
    boundary = JSON.parse(data);
    defaultBoundary();
    // First plot philly boundary then plot markers - crucial for layer order
    $.ajax(dataset).done(function(data) {
      parsedData = JSON.parse(data);
      defaultPage();
    });
  });
});
