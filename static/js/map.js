/* ==== Park Bench map in Seattle ==== */

var parkBenchesMap = L.map('parkBenchesMap').setView([47.6062, -122.3321], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'zacharilius.033jgmma',
    accessToken: 'pk.eyJ1IjoiemFjaGFyaWxpdXMiLCJhIjoiY2luemR3cmlyMTh6M3U4a2pmb3ZtZnZyMSJ9.Q1CwCauCwWmQd7t-Z8S8qQ'
}).addTo(parkBenchesMap);

$.getJSON('/static/js/seattle_parks.geojson', function (data) {
    var seattleParksStyle = {
            stroke: false,
            fillColor: '#31a354',
            fillOpacity: 0.8
        };

     var geojsonMarkerOptions = {
         radius: 3,
         fillColor: "#ff7800",
         color: "#000",
         weight: 1,
         opacity: 1,
         fillOpacity: 0.8
     };

     L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            if (feature.geometry.type == 'Polygon') {
                layer.setStyle(seattleParksStyle);
            }
        },
         pointToLayer: function(feature, latlng) {
             return L.circleMarker(latlng, geojsonMarkerOptions);
         }
     }).addTo(parkBenchesMap);
});



var legend = L.control({position: 'topright'});

function getColor(category) {
	return "";
}

legend.onAdd = function (map) {
    var legendEl = $('<div class="info legend"><p>Legend</p></div>');
    legendEl.append('<div><i class="circle"></i>Park Benches</div>');
    legendEl.append('<div><i class="square"></i>City Park</div>')
    return legendEl[0];
};

legend.addTo(parkBenchesMap);
