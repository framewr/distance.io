// Document Ready
$(function() {

    // Data Tables
   $('#example').dataTable({
        "sPaginationType": "full_numbers"
    });

    // Geo Button
    $('#geo-only').click(function() {
        window.location.href = window.location.href.split('?')[0] + '?locationType=GEO';
    });

    // No Filter
    $('#no-filter').click(function() {
        window.location.href = window.location.href.split('?')[0];
    });

    // Datepickers
    $("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function(selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        }
    }).datepicker( "setDate", "-3m" );
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function(selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    }).datepicker( "setDate", "+0" );
});

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng( TRANSACTIONS[0].location.coordinates[1] , TRANSACTIONS[0].location.coordinates[0]),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: MAPSTYLES
    };
    var markers = [];
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    TRANSACTIONS.forEach(function(transaction){
        var infowindow = new google.maps.InfoWindow({
            content: 'Time: ' + transaction.timestamp + '<br>IP: ' + transaction.ip + '<br>URL: ' + transaction.url
        });
        // To add the marker to the map, use the 'map' property
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(transaction.location.coordinates[1], transaction.location.coordinates[0]),
            map: map
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    });


    // Create the search box and link it to the UI element.
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var searchBox = new google.maps.places.SearchBox( /** @type {HTMLInputElement} */ (input));
    // [START region_getplaces]
    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }
        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });
            markers.push(marker);
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    });
    // [END region_getplaces]
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
}
google.maps.event.addDomListener(window, 'load', initialize);

var MAPSTYLES = [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#a2daf2"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f7f1df"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{
                "color": "#d0e3b4"
            }]
        }, {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#bde6ab"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [{
                "color": "#fbd3da"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffe15f"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#efd151"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "black"
            }]
        }, {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#cfb2db"
            }]
        }];