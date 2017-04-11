var map = L.map('map').setView([48.5514 , -123.0781], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'zacharilius.033jgmma',
    accessToken: 'pk.eyJ1IjoiemFjaGFyaWxpdXMiLCJhIjoiY2luemR3cmlyMTh6M3U4a2pmb3ZtZnZyMSJ9.Q1CwCauCwWmQd7t-Z8S8qQ'
}).addTo(map);

$.getJSON('/static/blog/SanJuanIsland.geojson', function (data) {
    // Define the geojson layer and add it to the map
    var geojsonMarkerOptions = {
        radius: 5,
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
