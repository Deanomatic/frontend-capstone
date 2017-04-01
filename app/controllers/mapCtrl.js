"use strict";
 
app.controller("mapCtrl", function($window, $scope, $timeout, UserdataFactory, AuthFactory) {
let user = AuthFactory.getUser();
var marker;
var userData;
let getUserLocations = () => {
UserdataFactory.userData(user)
        .then((data) => {
        userData = data;
           console.log("scope data", userData);
         }); 
  
}; 

$timeout(function() { 
  getUserLocations();
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.15429, lng: -86.76401},
      zoom: 14 
    });

    var locations = [];
    //console.log(userData);
    //locations.push ({name: "my spot", latlng: new google.maps.LatLng(36.15429, -86.76421)});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          uid: user
        };
        var marker =  new google.maps.Marker ({
            position: new google.maps.LatLng(pos),
            map: map
         //content: "Animal and weather and what not"
        });

        $timeout(function(){

        for(var i=0; i<userData.length; i++) {
          let coordinates = { 
            lat: userData[i].lat,
            lng: userData[i].lng
          };
          marker = new google.maps.Marker ({
            position: new google.maps.LatLng(coordinates),
            map: map,
            icon: "/images/pins/buck-pin.png",
            title: "Buck here"
          });
         //console.log("marker", marker);
        }
        
        }, 400);


         // var infoWindow = new google.maps.InfoWindow({
         //    map: map,
         //    content: "Animal, weather and time."
         //  });

         //  google.maps.event.addListener(marker, "click", function() {
         //    infoWindow.open(map, marker);
         //  });

        UserdataFactory.saveLocation(pos);
        console.log("pos", pos);
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found. Buck stops here!');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

}, 500);



});
