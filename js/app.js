var places = [
    {
        name: "Lakeview Milk Bar",
        location: {
            lat: 12.976058492482377,
            lng: 77.60379990297832
        }
    },
    {
        name: "Hoppipola - All Day Bar & Bonhomie",
        location: {
            lat: 12.97516841365876,
            lng: 77.60348809031643
        }
    },
    {
        name: "Tinga Tinga Bar & Cafe",
        location: {
            lat: 12.976285727568682,
            lng: 77.60261212295542
        }
    },
    {
        name: "Black Dog Bar",
        location: {
            lat: 12.974562822535832,
            lng: 77.6005377812076
        }
    },
    {
        name: "Page 3 Bar And Restaurant",
        location: {
            lat: 12.97101714366441,
            lng: 77.60594656402046
        }
    },
    {
        name: "Bang Rooftop Bar",
        location: {
            lat: 12.967806789185715,
            lng: 77.60178556791423
        }
    },
    {
        name: "The Glass House - Deli Bistro Bar",
        location: {
            lat: 12.970084081682407,
            lng: 77.59744343445422
        }
    },
    {
        name: "Brahmins Coffee Bar",
        location: {
            lat: 12.953988222576719,
            lng: 77.56884098052979
        }
    },
    {
        name: "Coco Grove Beer Cafe & Resto Bar",
        location: {
            lat: 12.975093778681511,
            lng: 77.60461465156055
        }
    }
];

var map;
var markers = [];

function initMap() {
    var myLatLng = {lat: 12.975140, lng: 77.604109};
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });

    ko.applyBindings(new ViewModel());
}

var ViewModel = function () {
    var self = this;

    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var mapBounds = new google.maps.LatLngBounds();

    var marker;

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
            '<p>Some <b>important<b> body.</p>' +
            '</div>' +
            '</div>';
        infowindow.setContent(html);
        infowindow.open(map, marker);
    }

    map.fitBounds(mapBounds);
};