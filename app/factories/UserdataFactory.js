"use strict";
//this actually stores users location to firebase using $http amnd post.
app.factory("UserdataFactory", function($q, $http, FBCreds, AuthFactory){
	//accessing the current user
	let user = AuthFactory.getUser();

	let postUserId = (currentUser) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/users.json`, angular.toJson(currentUser))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};


	//I need to pass whatever I pass into saveLocation into the angular method.
	let saveLocation = function(coordinates, user){
		$http.post(`${FBCreds.databaseURL}/users/${user}.json`, angular.toJson(coordinates));
	};
return {saveLocation, postUserId};
});