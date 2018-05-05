/* =====================
Default setup + Info
===================== */
var defaultPage = function(event) {
  featureGroup = L.geoJson(parsedData, {
    style: {color: "#50EBEC",
            radius: 4,
            fillColor: "#50EBEC",
            weight: 4,
            opacity: 0.4,
            fillOpacity: 0.8},
    onEachFeature:onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }
  }).addTo(map);
  map.setView([40.000, -75.16],11);
};

// Default interacive feature
var highlightFeature = function(feature) {
    var layer = feature.target;
    layer.setStyle({radius: 12,
                    color: "white",
                    opacity: 0.5,
                    fillColor: "white",
                    fillOpacity: 0.8,
    });
    bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
               "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" ;
    layer.bindTooltip(bindtext,{opacity: 0.7, offset:[-10,0], direction:'left'}).openTooltip();
};

var resetHighlight = function(feature) {
    featureGroup.resetStyle(feature.target);
};

var clickEachFeature = function(feature) {
    // hide all other pages
    $('#maps-page').hide();
    $('#filter-page').hide();
    $('#route-page').hide();
    // load info page
    $('.intsidebar').fadeIn();
    $('#info-page').fadeIn();
    var layer = feature.target;
    fillInfo(layer);
};

var onEachFeature = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: clickEachFeature,
    });
};

var fillInfo = function(layer) {
  $('#store_id').val("Store ID: " + layer.feature.properties.LOCNUM);
  $('#address').val("Address: " + layer.feature.properties.ADDR);
  $('#zipcode').val("Zipcode: " + layer.feature.properties.ZIP);
  $('#salesvol').val("Sales Volume: " + layer.feature.properties.SALES_VOL);
  $('#employees').val("# of Employees: " + layer.feature.properties.NUMBER_EMP);
  $('#population').val("Population: " + layer.feature.properties.POP);
  $('#households').val("# of Households: " + layer.feature.properties.HHs);
  $('#income').val("Median Income ($): " + layer.feature.properties.Med_Inc);
  $('#housevalue').val("Median House Value ($): " + layer.feature.properties.Med_Value);
  $('#pctwhite').val("% White: " + layer.feature.properties.Pct_White);
  $('#pctcollege').val("% College Degree: " + layer.feature.properties.Pct_Col2);
  $('#dhighway').val("Highway: " + layer.feature.properties.distHwy);
  $('#dshop').val("Other Coffee Shops: " + layer.feature.properties.CoffeeDist);
  $('#demploy').val("Employment Center: " + layer.feature.properties.distEmpC);
};

// Every time user clicks on "close", the map will be reset
var reset = function() {
  removeMarker();
  defaultPage();
  $('.info1').hide();
  $('.legend1').hide();
  $('.info2').hide();
  $('.legend2').hide();
};

$('#hideit1').click(function(e){
  reset();
});
$('#hideit2').click(function(e){
  reset();
});
$('#hideit3').click(function(e){
  reset();
});
$('#hideit4').click(function(e){
  reset();
});

var defaultBoundary = function(event) {
  var boundaryStyle = {
    color:"white",
    opacity:0.4,
    weight:1,
    fillOpacity:0,
    dashArray: '5',
  };
  featureGroup = L.geoJson(boundary, {
    style: boundaryStyle,
  }).addTo(map);
};

// Remove markers
var removeMarker = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

/* =====================
2 Maps
===================== */
// Map 1: Sales Volume
var getColor1 = function(d) {
    return d > 784  ? '#FDE725' :
           d > 560  ? '#B8DE29' :
           d > 392  ? '#55C667' :
           d > 280  ? '#238A8D' :
           d > 112  ? '#404788' :
                      '#481567';
};

var getRadius1 = function(d) {
    return d > 784  ? 12 :
           d > 560  ? 10 :
           d > 392  ? 8 :
           d > 280  ? 6 :
           d > 112  ? 4 :
                      3;
};

var getStyle1 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius1(feature.properties.SALES_VOL),
            fillColor: getColor1(feature.properties.SALES_VOL),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature1 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 14,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info1.update(layer.feature.properties);
};

var resetHighlight1 = function(e) {
    featureGroup.resetStyle(e.target);
    info1.update();
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight1,
    });
};

var info1 = L.control();

info1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML = '<h4>Sales Volume</h4>' +  (props ?
        '<strong>' + props.SALES_VOL + '</strong>' + ' (in thousand)'
        : 'Hover over a store');
};

// Legend
var legend1 = L.control({position: 'bottomright'});

legend1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info1 legend1'),
        grades = [0, 112, 280, 392, 560, 784],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map1 = function(event) {
  map.setView([40.0065476,-75.1531398],12);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle1,
    onEachFeature:onEachFeature1,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info1.addTo(map);
  legend1.addTo(map);
};

$('#mapsChoice1').click(function(e){
  removeMarker();
  $('.info2').hide();
  $('.legend2').hide();
  map1();
});

// Map 2: Number of Employees
var getColor2 = function(d) {
    return d > 14  ? '#FCF8B6' :
           d > 10  ? '#FF9864' :
           d > 7  ?  '#E74E62' :
           d > 5  ?  '#771B83' :
           d > 2  ?  '#34086B' :
                     '#150C3A';
};

var getRadius2 = function(d) {
    return d > 14  ? 12 :
           d > 10  ? 10 :
           d > 7   ? 8 :
           d > 5   ? 6 :
           d > 2   ? 4 :
                     3;
};

var getStyle2 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius2(feature.properties.NUMBER_EMP),
            fillColor: getColor2(feature.properties.NUMBER_EMP),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature2 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 14,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info2.update(layer.feature.properties);
};

var resetHighlight2 = function(e) {
    featureGroup.resetStyle(e.target);
    info2.update();
};

var onEachFeature2 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
    });
};

var info2 = L.control();

info2.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info2'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info2.update = function (props) {
    this._div.innerHTML = '<h4># of Employees</h4>' +  (props ?
        '<strong>' + props.NUMBER_EMP + '</strong>'
        : 'Hover over a store');
};

// Legend
var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info2 legend2'),
        grades = [0, 2, 5, 7, 10, 14],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map2 = function(event) {
  map.setView([40.0065476,-75.1531398],12);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle2,
    onEachFeature:onEachFeature2,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info2.addTo(map);
  legend2.addTo(map);
};

$('#mapsChoice2').click(function(e){
  removeMarker();
  $('.info1').hide();
  $('.legend1').hide();
  map2();
});

/* =====================
Filter
===================== */
// Above and Below Average
// Sales Volume - average: 522
// Employees - average: 9

var filterStyle = function(feature) {
  if (filterSelection === 1){
    if(feature.properties.SALES_VOL >= 522) {
      return {color:"#FCE205", fillColor:"#FCE205",
      radius: getRadius1(feature.properties.SALES_VOL)}; }}
  else if (filterSelection === 2){
    if(feature.properties.SALES_VOL < 522) {
      return {color:"#FCF4A3", fillColor:"#FCF4A3",
      radius: getRadius1(feature.properties.SALES_VOL)}; }}
  else if (filterSelection === 3){
    if(feature.properties.NUMBER_EMP >= 9) {
      return {color:"#FF0090", fillColor:"#FF0090",
      radius: getRadius2(feature.properties.NUMBER_EMP)}; }}
  else if (filterSelection === 4){
    if(feature.properties.NUMBER_EMP < 9) {
      return {color:"#FCA3B7", fillColor:"#FCA3B7",
      radius: getRadius2(feature.properties.NUMBER_EMP)}; }}
};

var myFilter = function(feature){
  if (filterSelection === 1){
    if(feature.properties.SALES_VOL >= 522) {
      return true; }}
  else if (filterSelection === 2){
    if(feature.properties.SALES_VOL < 522) {
      return true; }}
  else if (filterSelection === 3){
    if(feature.properties.NUMBER_EMP >= 9) {
      return true; }}
  else if (filterSelection === 4){
    if(feature.properties.NUMBER_EMP < 9) {
      return true; }}
};

var highlightFeature3 = function(feature) {
    var layer = feature.target;
    layer.setStyle({radius: 14,
                    color: "white",
                    opacity: 0.5,
                    fillColor: "white",
                    fillOpacity: 0.8,
    });
    if (filterSelection === 1 || filterSelection === 2 || customSelection === 1) {
      bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
                 "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" +
                 "<dt>" + "Sales Volume: " + layer.feature.properties.SALES_VOL + "</dt>";
    }else if (filterSelection === 3 || filterSelection === 4 || customSelection === 2) {
      bindtext = "<dt>" + "Store ID: " + layer.feature.properties.LOCNUM + "</dt>" +
                 "<dt>" + "Address: " + layer.feature.properties.ADDR + "</dt>" +
                 "<dt>" + "# of Employees: " + layer.feature.properties.NUMBER_EMP + "</dt>";
    }
    layer.bindTooltip(bindtext,
    {opacity: 0.7, offset:[-10,0], direction:'left'}).openTooltip();
};

var resetHighlight3 = function(feature) {
    featureGroup.resetStyle(feature.target);
};

var onEachFeature3 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature3,
        mouseout: resetHighlight3,
    });
};

var filteredMap = function(event) {
  removeMarker();
  featureGroup = L.geoJson(parsedData, {
    style: filterStyle,
    onEachFeature:onEachFeature3,
    filter: myFilter,
    pointToLayer: function (feature, latlng) { return L.circleMarker(latlng,{weight: 4,opacity: 0.4,fillOpacity: 0.8});}
  }).addTo(map);
  map.setView([40.0065476,-75.1531398],12);
};

$('#filter-choice1-above').click(function(e){
  filterSelection = 1;
  customSelection = 1;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice1-below').click(function(e){
  filterSelection = 2;
  customSelection = 1;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice2-above').click(function(e){
  filterSelection = 3;
  customSelection = 2;
  removeFilterInput();
  filteredMap();
});

$('#filter-choice2-below').click(function(e){
  filterSelection = 4;
  customSelection = 2;
  removeFilterInput();
  filteredMap();
});

// Customized filter option
$('#filter-choice1-custom').click(function(e){
  customSelection = 1;
  filterSelection = 1;
});
$('#filter-choice2-custom').click(function(e){
  customSelection = 2;
  filterSelection = 3;
});

$('#filter-go').click(function(e){
  // Set view
  map.setView([40.0065476,-75.1531398],12);
  // Get user input
  var min;
  var max;
  if(customSelection === 1){
    min = $('#low_salesvol').val();
    max = $('#high_salesovol').val();
  }else if(customSelection === 2){
    min = $('#low_emp').val();
    max = $('#high_emp').val();
  }
  // Remove current marker
  removeMarker();
  // Filter
  var customFilter = function(feature){
    if (customSelection === 1){
      if(feature.properties.SALES_VOL>=min & feature.properties.SALES_VOL<=max ){
        return true;
      }}
    else if (customSelection === 2){
      if(feature.properties.NUMBER_EMP>=min & feature.properties.NUMBER_EMP<=max ){
        return true;
      }}
  };
  var customStyle = function(feature) {
    if (customSelection === 1){
      return {radius: getRadius1(feature.properties.SALES_VOL)}; }
    else if (customSelection === 2){
      return {radius: getRadius2(feature.properties.NUMBER_EMP)}; }
  };
  // Plot new map
  featureGroup = L.geoJson(parsedData, {
    style: customStyle,
    onEachFeature:onEachFeature3,
    filter: customFilter,
    pointToLayer: function (feature, latlng) { return L.circleMarker(latlng,{color:"#7FFF00",fillColor:"#7FFF00",weight: 4,opacity: 0.4,fillOpacity: 0.8});}
  }).addTo(map);
});

var removeFilterInput = function(){
  if(customSelection === 1){
    $('#low_salesvol').val("");
    $('#high_salesovol').val("");
  }else if(customSelection === 2){
    $('#low_emp').val("");
    $('#high_emp').val("");
  }
};

$('#filter-clear').click(function(e){
  removeFilterInput();
  removeMarker();
});

/* =====================
Route
===================== */
var state = {
  position: {
    marker: null,
    updated: null
  }
};

// Personized drop pin icon to mark current location
var myIcon = L.icon({
  iconUrl: 'my-icon.png',
  iconSize: [35, 30],
  popupAnchor: [0, -20]
});

var myIcon2 = L.icon({
  iconUrl: 'my-icon-default.png',
  iconSize: [35, 30],
  popupAnchor: [0, -20]
});

var updatePosition = function(lat, lng, updated) {
  if (state.position.marker) { map.removeLayer(state.position.marker); }
  state.position.marker = L.marker([lat, lng],{icon: myIcon});
  state.position.updated = updated;
  locationMarker = state.position.marker;
  locationMarker.addTo(map).bindPopup('Your current location');
};

// Set the original location
var origin = {"lat":0, "lng":0};

// Only the first time user clicks the route page, we will ask if user allows for geolocating their position
$('#route-page').one("click", function () {
  /* This 'if' check allows us to safely ask for the user's current position */
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
      // Set current position as the origin
      origin.lat = position.coords.latitude;
      origin.lng = position.coords.longitude;
      console.log(origin);
    });
  } else {
    alert("Allow us to know your current position to try the 'Route' page!");
  }
});

$("#go").click(function(e) {
  removeLine();
  var storeID = $('#usr').val();
  var store = _.select(parsedData.features, function (obj) {
      return obj.properties.LOCNUM === Number(storeID);
    });
  // Check if the store ID is entered correctly
  if(store.length !== 0) {
    var dest_lat = store[0].properties.lat;
    var dest_lng = store[0].properties.lng;
    /* If fail to get correct current location, se default start point*/
    if (origin.lng === 0 || origin.lat === 0) {
      origin.lat = 39.952562;
      origin.lng = -75.192620;
      alerttext = "<dt>" + "Defalut location marker" + "</dt>" +
                  "<dt>" + "(Shows if unable to get your location)" + "</dt>";
      L.marker([origin.lat, origin.lng],{icon: myIcon2}).addTo(map).bindPopup(alerttext);
    }
    /* Otherwise, use user's current location as the origin */
    var myToken = "pk.eyJ1Ijoibm9yYXlpbiIsImEiOiJjamZoYnVhajYzcWRjMnFvZnhkc2lkaDFnIn0.uwQxjsuwtL0epbau5U0M7Q";
    var route = "https://api.mapbox.com/directions/v5/mapbox/driving/" + origin.lng + "," + origin.lat + ";" + dest_lng + "," + dest_lat + "?access_token=" + myToken;
    $.ajax(route).done(function(data){
      var eachRoute = decode(data.routes[0].geometry);
      var latlngs = _.map(eachRoute, function(each) {return [each[1]*10, each[0]*10];});
      // Map the route using turf.js
      var line = turf.lineString(latlngs);
      var routeStyle = {
        "color": "pink",
        "weight": 3,
        "opacity": 0.7
      };
      generatedRoute = L.geoJson(line, {style: routeStyle}).addTo(map);
    });
  } else {
    alert("Please enter a correct store ID!");
  }
});

// Remove route function
var removeLine = function(){
  if (typeof generatedRoute !== 'undefined') {
    map.removeLayer(generatedRoute);
  }
};

$("#clear").click(function(e) {
  $('#usr').val('');
  removeLine();
});

// For better user interaction, choose not to use the code below
/* Make input field empty again even if there has been some text in it
$('#usr').focus(
    function(){
        $(this).val('');
    });
*/
