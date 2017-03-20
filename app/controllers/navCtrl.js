"use strict";

app.controller("navCtrl", function($scope, $window){
	//$scope.searchText = searchTermData;
	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			$scope.isLoggedIn = true;
		}else{
    		$scope.isLoggedIn = false;
    		$window.locationhref = "#!/login";
    	}
	});
});

