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
  "buck": {
    'image': "/images/pins/buck-pin.png", 
    'title': 'A buck was sighted here'
  },
  "doe": {
    'image': "/images/pins/doe-pin.png", 
    'title': 'A doe was sighted here'
  },
  "turkey": {
    'image': "/images/pins/turkey-pin.png", 
    'title': 'A turkey was sighted here'
  },
  "droppings": {
    'image': "/images/pins/poop-pin.png", 
    'title': 'Droppings were sighted here'
  },
  "food-source": {
    'image': "/images/pins/acorn-pin.png", 
    'title': 'A food source was sighted here'
  },
  "predator": {
    'image': "/images/pins/predator.png", 
    'title': 'A predator was sighted here'
  },
  "road-kill": {
    'image': "/images/pins/road-kill-pin.png", 
    'title': 'Road kill was sighted here'
  },
  "shed": {
    'image': "/images/pins/shed-pin.png", 
    'title': 'A buck shed was sighted here'
  },
  "tracks": {
    'image': "/images/pins/tracks.png", 
    'title': 'Tracks were sighted here'
  },
  "trail": {
    'image': "/images/pins/trail-pin.png", 
    'title': 'A trail was sighted here'
  },
  "buck-rub": {
    'image': "/images/pins/tree-pin.png", 
    'title': 'A buck rub was sighted here'
  },
  "water-source": {
    'image': "/images/pins/water-pin.png", 
    'title': 'A water source was sighted here'
  }
};

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
    // if (navigator.geolocation && icon != undefined) {
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
            icon: saved_icon[userData[i].icon]['image'],
            title: saved_icon[userData[i].icon]['title']
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
