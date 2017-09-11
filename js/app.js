var places = [
    {
        name: "Test1",
        location: {
            lat: -34.397,
            lng: 150.644
        }
    },
    {
        name: "Test2",
        location: {
            lat: -33.397,
            lng: 150.644
        }
    },
    {
        name: "Test3",
        location: {
            lat: -32.397,
            lng: 150.644
        }
    },
    {
        name: "Test4",
        location: {
            lat: -31.397,
            lng: 150.644
        }
    },
    {
        name: "Test5",
        location: {
            lat: -30.397,
            lng: 150.644
        }
    },
    {
        name: "Test6",
        location: {
            lat: -32.397,
            lng: 149.644
        }
    },
    {
        name: "Test7",
        location: {
            lat: -32.397,
            lng: 148.644
        }
    },
    {
        name: "Test8",
        location: {
            lat: -32.397,
            lng: 147.644
        }
    },
    {
        name: "Test9",
        location: {
            lat: -32.397,
            lng: 146.644
        }
    },
    {
        name: "Test10",
        location: {
            lat: -32.397,
            lng: 145.644
        }
    }
];

var map;
var markers = [];

function initMap() {
    var myLatLng = {lat: -34.397, lng: 150.644};
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