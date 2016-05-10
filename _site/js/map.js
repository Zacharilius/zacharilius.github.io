// initialize the map
var map = L.map('map').setView([47.6062, -122.3321], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'zacharilius.033jgmma',
    accessToken: 'pk.eyJ1IjoiemFjaGFyaWxpdXMiLCJhIjoiY2luemR3cmlyMTh6M3U4a2pmb3ZtZnZyMSJ9.Q1CwCauCwWmQd7t-Z8S8qQ'
}).addTo(map);

$.getJSON('/js/seattle_parks_rec.json', function (data) {
    // Define the geojson layer and add it to the map
	var geojsonMarkerOptions = {
	    radius: 3,
	    fillColor: "#ff7800",
	    color: "#000",
	    weight: 1,
	    opacity: 1,
	    fillOpacity: 0.8
	};

	L.geoJson(data, {
	    pointToLayer: function (feature, latlng) {
	        return L.circleMarker(latlng, geojsonMarkerOptions);
	    }
	}).addTo(map);
});

var legend = L.control({position: 'topright'});

function getColor(category) {
	return "#ff7800";
}

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += "<p>Legend</p>";
    var categories = ['Park Benches'];
    var labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < categories.length; i++) {
		div.innerHTML +=
	        '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
	         (categories[i] ? categories[i] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
