"use strict";

app.controller("homeCtrl", function($scope, $window, UserdataFactory, AuthFactory){
	let user = AuthFactory.getUser();
	// Runmap is changing the view to map partial. 
	$scope.runMap = ()=> {
		//This needs scope to give it access to the partial.
		$window.location.href = "#!/map";
	};
	// var locations = [];
 //    // getData() runs the 'UserdataFactory.userData()' function
 //    // that gets all the user's data from FB.
 //    // getData() runs by a click envent in 'home.html'.
 //    $scope.getData = function(){
 //      console.log("getData got clicked");
 //    UserdataFactory.userData(user)
 //        .then((data) => {
 //          $scope.userData = data.data;
 //          console.log("scope data", $scope.userData);
 //        }); 
 //    };


});