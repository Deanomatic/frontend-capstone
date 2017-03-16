"use strict";

app.factory("MapFactory", function($q, $http, FBCreds){
	let saveLocation = function(coord){
		$http.post(`${FBCreds.databaseURL}/coord.json`, angular.toJson(coord));
	};
return {saveLocation};
})