"use strict"; 
console.log("Am i logging controller?");

//login, logout, register, loginGoogle, clever conditional, authFactory

app.controller("loginCtrl", function($scope, $window, AuthFactory, $location, UserdataFactory){

	$scope.account = {
		email: "",
		password: "",
		userName: ""
	};

let logout = () => {
			console.log("logout clicked");
			AuthFactory.logoutUser()
			.then(function(data){
				console.log("logged out?", data);
				$window.location.url = "#!/login";
			}, function(error){
				console.log("error occured on logout");
			});
		};

	if(AuthFactory.isAuthenticated()){
		logout();
	} 
	 	

	$scope.register = (user, saveLocation) => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password,
	      userName: $scope.account.userName
	    })
	    .then( (userData) => {
	      console.log("UserCtrl newUser:", userData );
	      let user = {
	      	userName: "",
	      	uid: userData.uid
	      };
	      console.log(user);
	      UserdataFactory.postUserId(user);
	      $scope.login();
	    }, (error) => {
	        console.log("Error creating user:", error);
	    });
  	};

  	$scope.login = () => {
    	console.log("you clicked login");
    	AuthFactory
	    .loginUser($scope.account)
	    .then( (result) => {
	    	let user = result.uid;
	    	console.log($scope.account);
	        // $scope.isLoggedIn = true;
	        // console.log("UserCtrl: user is loggedIn", $scope.isLoggedIn );
	        // $scope.$apply();
	        $window.location.href = "#!/home";
	    });
	};

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	let user = result.user.uid;
	    	console.log("logged in user:", user);
	    	//Once logged in, go to another view
	    	$location.path("/home");
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
	  	});
	};

});
