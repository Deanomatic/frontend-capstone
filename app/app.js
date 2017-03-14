"use strict"; 
console.log("App connection is a go!");

let app = angular.module("faceBuck",["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) =>{
	console.log("Is the auth alive??");
	AuthFactory.isAuthenticated()
	.then ((userExists) => {
		if (userExists){
			console.log("userExists", userExists);
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
	.when("/home", {
		templateUrl: "partials/home.html",
		controller: "homeCtrl"
	})
	.otherwise("/");
});

app.run(($location, FBCreds) => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };

    firebase.initializeApp(authConfig);
});