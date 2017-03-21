"use strict";
//this actually stores users location to firebase using $http amnd post.
app.factory("UserdataFactory", function($q, $http, FBCreds, AuthFactory){
	//accessing the current user
	let user = AuthFactory.getUser();

	let postUserLocation = (currentUser) => {
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
	let saveLocation = function(coordinates){
		$http.post(`${FBCreds.databaseURL}/users.json`, angular.toJson(coordinates));
	};

	let userData = (user) => {
		let data = [];
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject) => {
				let itemCollection = itemObject.data;
				Object.keys(itemCollection)
				.forEach((key) => {
					itemCollection[key].id = key;
					data.push(itemCollection[key]);
					//console.log("itemCollection", itemCollection);	
				});
				//console.log(data);
				resolve(data);
				//console.log("users", users);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewItem = (newItem) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/items.json`,
				JSON.stringify(newItem))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error)=>{

			});
		});
	};

	
return {saveLocation, postUserLocation, userData};
});