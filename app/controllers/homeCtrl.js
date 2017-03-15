"use strict";

app.controller("homeCtrl", function($scope, $window){
	console.log("Yo you should see this!!");
	$scope.runMap = ()=> {
		$window.location.href = "#!/map";
	};

});