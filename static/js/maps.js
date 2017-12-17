window.onload = function(e){
    setupFreemontHourlyBikeUse();
    setupRestaurantCleanlinessRatings();
    setupParksBenchMap();
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

/* ==== Freemont Hourly Bike Use ==== */

function setupFreemontHourlyBikeUse() {
    var map = L.map('freemont-hourly-bike-use-map').setView([47.64669181321324, -122.3495650291443], 16);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'zacharilius.033jgmma',
        accessToken: 'pk.eyJ1IjoiemFjaGFyaWxpdXMiLCJhIjoiY2luemR3cmlyMTh6M3U4a2pmb3ZtZnZyMSJ9.Q1CwCauCwWmQd7t-Z8S8qQ'
    }).addTo(map);

    $.getJSON('https://data.seattle.gov/resource/4xy5-26gy.json', function (data) {
        var sortedData = data.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a < b ? -1 : a > b ? 1 : 0;
        });

        // Only include the most recent biking data & datums with non-zero bike data.
        var filteredData = data.filter(function(a) {
            var firstDayOf2017 = new Date("2017-01-01T04:00:00.000")
            var hasBikeData = a.fremont_bridge_nb !== "0" && a.fremont_bridge_sb !== "0";
            return new Date(a.date) > firstDayOf2017 && hasBikeData;
        });

        var bikeDataInfoDatas = calculateBikeDataInfos(filteredData);
        var i = 0;
        updateMapForBikeInfo(map, bikeDataInfoDatas, i);
    });
}

function calculateBikeDataInfos(filteredData) {
    var bikeDataInfoDatas = [];
    for (var i = 0; i < filteredData.length - 1; i++) {
        var thisDatum = filteredData[i];
        var nextDatum = filteredData[i+1];
        var thisDatetime = new Date(thisDatum.date);
        var nextDatetime = new Date(nextDatum.date);
        var diffInMs = nextDatetime - thisDatetime;
        var diffInHours = convertMillaSecondsToHours(diffInMs);

        var bikesNb = Number(thisDatum.fremont_bridge_nb);
        var bikesSb = Number(thisDatum.fremont_bridge_sb);
        bikeDataInfoDatas.push({
            datetime: thisDatetime,
            timePeriodInHours: diffInHours,
            bikesNb: bikesNb,
            bikesSb: bikesSb,

        });
    }
    return bikeDataInfoDatas;
}

function convertMillaSecondsToHours(millaseconds) {
    return millaseconds / 1000 / 60 / 60;
}

function updateMapForBikeInfo(map, bikeInfos, i) {
    var northboundRoutePoints = [
        [47.64682914542984, -122.34973669052125],
        [47.64714717654514, -122.34977960586549],
        [47.647436294060476, -122.34980106353761],
        [47.647624219587286, -122.34980106353761],
        [47.64778323296645, -122.34980106353761],
        [47.64791333446205, -122.34980106353761],
        [47.64808680261875, -122.34977960586549],
        [47.64820244773646, -122.34977960586549]
    ]

    var bikeInfo = bikeInfos[i];
    document.querySelector('#freemont-bridge-datetime').innerHTML = bikeInfo.datetime.toLocaleString()
    var bikesNb = bikeInfo.bikesNb
    var bikesSb = bikeInfo.bikesSb
    var totalBikesBothDirections = bikesNb + bikesSb;
    // Using global scope to be shared by both 'northbound bike animation and
    // southbound bike function calls.
    window.totalBikesBothDirections = totalBikesBothDirections;

    northboundRouteLine = L.polyline(northboundRoutePoints);
    animateBikesOnMap(map, bikeInfos, i, northboundRouteLine, bikesNb);

    var southboundRoutePoints = northboundRoutePoints.slice(0).reverse();
    southboundRouteLine = L.polyline(southboundRoutePoints);
    animateBikesOnMap(map, bikeInfos, i, southboundRouteLine, bikesSb);
}

/**
  * Recursively animates bikes on the map using setInterval.
  */
function animateBikesOnMap(map, bikeInfos, currFilteredDataIndex, routeLine, routeNumBikesToAnimate) {
    var bikeIcon = L.icon({
        iconUrl: '/static/images/bike.png',
        iconSize: [12, 20],
        iconAnchor: [6, 20],
        shadowUrl: null
    });
    var numBikesLeftToAnimate = routeNumBikesToAnimate;

    var bikeInfo = bikeInfos[currFilteredDataIndex];
    var routeBikesPerHour = bikeInfo.timePeriodInHours / routeNumBikesToAnimate;
    var AVERAGE_TIME_FOR_BIKE_ICON_T0_CROSS_BRIDGE = 900;  // ms
    var scaledTimePeriod = convertBikeIntoIntervalToScaledIntervalTime(bikeInfo.timePeriodInHours);
    var interval = scaledTimePeriod / routeNumBikesToAnimate;

    var addBikesToMapIntervalCaller = window.setInterval(function() {
        if (numBikesLeftToAnimate <= 0) {
            window.clearInterval(addBikesToMapIntervalCaller);
            // FIXME: Clear intervals.
            return;
        }
        var startDatetime = new Date();
        var marker = L.animatedMarker(routeLine.getLatLngs(), {
            icon: bikeIcon,
            autoStart: false,
            onEnd: function() {
                numBikesLeftToAnimate -= 1;
                window.totalBikesBothDirectionsotalBikesBothDirections -= 1;
                if (window.totalBikesBothDirections == 1) {
                    currFilteredDataIndex += 1;
                    updateMapForBikeInfo(map, bikeInfos, currFilteredDataIndex);
                }
                $(this._shadow).fadeOut();
                $(this._icon).fadeOut(100, function() {
                    map.removeLayer(this);
                });
            }
        });

        map.addLayer(marker);
        marker.start();
    }, interval);
}

/**
  * Converts a number of hours to scaled number of hours to be displayed on the
  * freemont bike map.
  *
  * Scale 1 hour is respresented as 250ms.
  */
function convertBikeIntoIntervalToScaledIntervalTime(hours) {
    return hours * 250;
}
