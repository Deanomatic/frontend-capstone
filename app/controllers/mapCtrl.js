"use strict";
 //I need a a marker function that will save the data as the specific icon, 
 //but will add the new icon that is specified. So the old icons are still 
 //saved the way they should be and the new one is not overwritten.
app.controller("mapCtrl", function($window, $scope, $timeout, UserdataFactory, AuthFactory, IconsFactory) {
let user = AuthFactory.getUser();
var marker;
var userData;
var icon = IconsFactory.getsavedinfo();
var saved_icon = {
  "buck": "/images/pins/buck-pin.png",
  "doe": "/images/pins/doe-pin.png"
};
console.log("saved icon", saved_icon, icon, saved_icon[icon]);
let getUserLocations = () => {
UserdataFactory.userData(user)
        .then((data) => {
        userData = data;
           console.log("scope data", userData);
         }); 
  
}; 

let runBuck = () => {

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
          uid: user,
          icon: icon
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
            icon: saved_icon[userData[i].icon],
            title: "Buck here"
          });
         //console.log("marker", marker);
        }
        }, 500);


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
  
}; 

runBuck();



});
