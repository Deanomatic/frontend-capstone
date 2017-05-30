"use strict";
console.log("icon factory connected");
app.factory("IconsFactory", function(){
/////////Trying to listen for the id that is clicked and and execute the conditional statement based off of that id
	// $(document).ready(function () {
	//     $("#someWrapper").each(function () {
	//         $(this).on('click', function () {
	//             alert(this.id);
	//         });
	//     });
	// });
	iconId = document.addEventListener("click", function(e){
		console.log("Got the Id", e.target.id)
		return e.target.id
	})

	if (iconId == 1){
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
	} else if (iconId == 2) {
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

	}

	let callMap = ()=> {
		
	};
})