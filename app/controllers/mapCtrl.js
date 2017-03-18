"use strict";
 
app.controller("mapCtrl", function($window, $scope, $timeout, UserdataFactory, AuthFactory) {
$scope.user = AuthFactory.getUser();
console.log("Can I get a map up in here??");

$timeout(function() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.15429, lng: -86.76401},
      zoom: 14 
    });

    var locations = [];
    locations.push ({name: "my spot", latlng: new google.maps.LatLng(36.15429, -86.76421)});
    locations.push ({name: "my spot", latlng: new google.maps.LatLng(36.15729, -86.76432)});
    locations.push ({name: "my spot", latlng: new google.maps.LatLng(36.16829, -86.76401)});

    for(var i=0; i<locations.length; i++) {
      var marker = new google.maps.Marker ({
        position: locations[i].latlng,
        map: map, 
        title: locations[i].name
      });
    }

    marker =  new google.maps.Marker({
        position: new google.maps.LatLng(36.15429, -86.76401),
        map: map,
        title: "Buck here",
        content: "Animal and weather and what not"
    });

    var infoWindow = new google.maps.InfoWindow({
      map: map,
      content: "Animal, weather and time."
    });

    google.maps.event.addListener(marker, "click", function() {
      infoWindow.open(map, marker);
    });

    console.log("map", map);
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          uid: $scope.user
        };
        UserdataFactory.saveLocation(pos);
        console.log("pos", pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found. Buck stops here!');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

}, 500);

});
