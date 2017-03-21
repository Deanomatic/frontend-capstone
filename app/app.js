"use strict"; 

let app = angular.module("buckStop",["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) =>{
	AuthFactory.isAuthenticated()
	.then ((userExists) => {
		if (userExists){
				resolve();
		}else{
			console.log("No good! Make an account!");
				reject();
		}
	});
});

app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "partials/login.html",
		controller: "loginCtrl"
	})
	.when("/map", {
		templateUrl: "partials/map.html",
		controller: "mapCtrl",
		resolve: {isAuth}
	})
	.when("/home", {
		templateUrl: "partials/home.html",
		controller: "homeCtrl",
		resolve: {isAuth}
	})
	.when("/journal", {
		templateUrl: "partials/sightings.html",
		controller: "sightingsCtrl",
		resolve: {isAuth}
	})
	.otherwise("/");
});
//You need this to authrnticate your firebase. It won't run without it.
app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});