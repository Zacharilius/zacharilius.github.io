window.onload = function(e){
    setupParksBenchMap();
    setupRestaurantCleanlinessRatings();
}

/* ==== Park Benches in Seattle ==== */

function setupParksBenchMap() {
    var parkBenchesMap = L.map('park-benches-map').setView([47.6062, -122.3321], 11);

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
             radius: 2,
             fillColor: '#ff7800',
             color: '#000',
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

    legend.onAdd = function (map) {
        var legendEl = $('<div class="info legend"><p>Legend</p></div>');
        legendEl.append('<div><i class="circle"></i>Park Benches</div>');
        legendEl.append('<div><i class="square"></i>City Park</div>')
        return legendEl[0];
    };

    legend.addTo(parkBenchesMap);
}


/* ==== Restaurant Cleanliness Ratings ==== */

function setupRestaurantCleanlinessRatings() {
    var restaurantRatingsMap = L.map('restaurant-cleanliness-rating-map').setView([47.7062, -122.3321], 11);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'zacharilius.033jgmma',
        accessToken: 'pk.eyJ1IjoiemFjaGFyaWxpdXMiLCJhIjoiY2luemR3cmlyMTh6M3U4a2pmb3ZtZnZyMSJ9.Q1CwCauCwWmQd7t-Z8S8qQ'
    }).addTo(restaurantRatingsMap);

    var markers = new L.MarkerClusterGroup();

    $.getJSON('/static/js/seattle_new_food_rating_system.geojson', function (data) {
         L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                var marker = L.marker(latlng, { title: 'title' });
                marker.bindPopup(formatBusinessProperties(feature.properties)).openPopup();
                markers.addLayer(marker);
             }
         });
    });

    markers.on('clusterclick', function (a) {
        a.layer.zoomToBounds();
    });

    restaurantRatingsMap.addLayer(markers);
}

function formatBusinessProperties(businessProperties) {
    var name = '<p>' + businessProperties.businessName.toLowerCase() + '</p>';

    var businessGrade = businessProperties.businessGrade;
    var rating = convertStarsToRating(businessGrade);

    return name + rating;
}

// Based on a 4 potential rating system 1 (Excellent) - 4 (Needs to Improve)
function convertStarsToRating(rating) {
    var rating = Number(rating);  // Reinterpret
    var ratingText;
    if (rating === 1) {
        ratingText = 'Excellent';
    } else if (rating === 2) {
        ratingText =  'Good';
    } else if (rating === 3) {
        ratingText =  'Okay';
    } else if (rating === 4) {
        ratingText =  'Needs to Improve';
    } else {
        throw "Could not locte business grade.";
    }

    var starIcons = ''
    var numberGoodStars = 5 - rating;
    for (var i = numberGoodStars; i > 0; i--) {
        starIcons += '<i class="material-icons">star</i>'
    }

    var numberBadStars = 4 - numberGoodStars;
    for (var j = numberBadStars; j > 0; j--) {
        starIcons += '<i class="material-icons">star_border</i>'
    }

    var ratingOutput = '<div class="rating-info"><span>' + ratingText + ':</span>' + starIcons + '</div>';
    return ratingOutput
}
