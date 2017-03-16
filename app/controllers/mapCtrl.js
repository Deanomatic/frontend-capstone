"use strict";

app.controller("mapCtrl", ($window, $scope, $timeout)=> {
	console.log("Can I get a map up in here??");
	//$scope.googleMapsURL = $sce.trustAsResourceURL("");

$timeout(function() {
function initMap() {
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 6
    });
    console.log(map);
    var infoWindow = new google.maps.InfoWindow({map: map});
    console.log("Dis be dah map!", infoWindow);
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("position", pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
	}
}, 500);
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

	
	
});
