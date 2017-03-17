"use strict";
//this actually stores users location to firebase using $http amnd post.
app.factory("UserdataFactory", function($q, $http, FBCreds){
	//I need to pass whatever I pass into saveLocation into the angular method.
	let saveLocation = function(coordinates){
		$http.post(`${FBCreds.databaseURL}/coordinates.json`, angular.toJson(coordinates));
	};
return {saveLocation};
})