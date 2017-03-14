"use strict"; 
console.log("Am i logging controller?");

//login, logout, register, loginGoogle, clever conditional, authFactory

app.controller("loginCtrl", function($scope, $window, AuthFactory, $location){

	$scope.account = {
		email: "",
		password: ""
	};

 
	 	

	$scope.register = () => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then( (userData) => {
	      console.log("UserCtrl newUser:", userData );
	      $scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
    	console.log("you clicked login");
    	AuthFactory
	    .loginUser($scope.account)
	    .then( () => {
	        // $scope.isLoggedIn = true;
	        // console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
	        // $scope.$apply();
	        $window.location.href = "#!/items/list";
	    });
	};

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);
	    	//Once logged in, go to another view
	    	$location.path("/items/list");
	    	$scope.$apply();
	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// The email of the user's account used.
	    	var email = error.email;
	    	// The firebase.auth.AuthCredential type that was used.
	    	var credential = error.credential;
	    	// ...
	  	});
	};

});
