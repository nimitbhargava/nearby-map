var places = [
    {
        name: "Nosh & Tipple",
        location: {
            lat: 12.9750796,
            lng: 77.6045972
        },
        res_id: 18450886
    },
    {
        name: "Hoppipola - All Day Bar & Bonhomie",
        location: {
            lat: 12.97516841365876,
            lng: 77.60348809031643
        },
        res_id: 51441
    },
    {
        name: "Tinga Tinga Bar & Cafe",
        location: {
            lat: 12.976285727568682,
            lng: 77.60261212295542
        },
        res_id: 18208388
    },
    {
        name: "Black Dog Bar",
        location: {
            lat: 12.974562822535832,
            lng: 77.6005377812076
        },
        res_id: 53059
    },
    {
        name: "Page 3 Bar And Restaurant",
        location: {
            lat: 12.97101714366441,
            lng: 77.60594656402046
        },
        res_id: 52700
    },
    {
        name: "Bang Rooftop Bar",
        location: {
            lat: 12.967806789185715,
            lng: 77.60178556791423
        },
        res_id: 50975
    },
    {
        name: "The Glass House - Deli Bistro Bar",
        location: {
            lat: 12.970084081682407,
            lng: 77.59744343445422
        },
        res_id: 18224650
    },
    {
        name: "Brahmins Coffee Bar",
        location: {
            lat: 12.953988222576719,
            lng: 77.56884098052979
        },
        res_id: 18432970
    },
    {
        name: "Coco Grove Beer Cafe & Resto Bar",
        location: {
            lat: 12.975093778681511,
            lng: 77.60461465156055
        },
        res_id: 57438
    }
];

var map;
var markers = [];
var myLatLng = {position: {lat: 12.975140, lng: 77.604109}};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng.position,
        zoom: 8
    });

    ko.applyBindings(new ViewModel());
}

var ViewModel = function () {
    var self = this;

    var infowindow = new google.maps.InfoWindow();

    var mapBounds = new google.maps.LatLngBounds();

    var marker = [];

    for (var k = 0; k < places.length; k++) {
        marker = new google.maps.Marker({
            id: places[k],
            position: places[k].location,
            map: map,
            title: places[k].name,
            animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        mapBounds.extend(markers[k].position);
        marker.addListener('click', (function (marker) {
            return function () {
                openInfoWindowAndAnimateMarker(marker);
            };
        })(marker));
    }

    this.displayMarker = function (place) {
        openInfoWindowAndAnimateMarker(place);
    }

    function openInfoWindowAndAnimateMarker(marker) {
        openInfoWindow(marker);
        annimateMarker(marker);
        movingMapPosition(marker);
    }

    function annimateMarker(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1400);
    }

    function openInfoWindow(marker) {
        var html = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>' +
            '<div id="bodyContent">' +
            '<p>Fetching rating...</p>' +
            '</div>' +
            '</div>';
        infowindow.setContent(html);
        infowindow.open(map, marker);
        self.populateInfoWindow(marker);
    }

    function movingMapPosition(marker) {
        mapBounds.extend(marker.position);
        map.fitBounds(mapBounds);
    }

    self.userInput = ko.observable('');
    self.filterPlaces = ko.computed(function () {
        movingMapPosition(myLatLng);
        infowindow.close(map);
        var result = [];
        var query = self.userInput().toLowerCase();
        for (var k = 0; k < markers.length; k++) {
            var place = markers[k];
            if (place.title.toLowerCase().indexOf(query) > -1 || (query === '')) {
                result.push(place);
                markers[k].setVisible(true);
            } else {
                markers[k].setVisible(false);
            }
        }
        return result;
    }, this);

    this.populateInfoWindow = function (marker) {
        var requestURL = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + marker.id.res_id;

        $.ajax({
            type: 'GET',
            url: requestURL,
            headers: {"user-key": "a9324833b3b60340f0ceee6edd70ac99"}
        }).done(function (data) {
            $('#bodyContent p').text("Rating is: " + data.user_rating.aggregate_rating + " stars");
        }).fail(function () {
            $('#bodyContent p').text("Failed to fetch rating from Zomato API");
        });
    };
    map.fitBounds(mapBounds);
};

function handleMapError() {
    $('#map').html("<p>Google Maps can not be loaded at this time.</p>")
}