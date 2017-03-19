// "use strict";

// app.controller("navCtrl", function($scope, searchTermData, $window){
// 	$scope.searchText = searchTermData;
// 	$scope.isLoggedIn = false;

// 	firebase.auth().onAuthStateChanged(function(user){
// 		if (user) {
// 			$scope.isLoggedIn = true;
// 			console.log("Am I logged in?");
// 		}else{
//     		$scope.isLoggedIn = false;
//     		$window.locationhref = "#!/login";
//     		console.log("Logged in or naw??");
//     	}
// 	});
// });