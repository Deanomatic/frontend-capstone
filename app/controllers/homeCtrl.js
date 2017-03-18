"use strict";

app.controller("homeCtrl", function($scope, $window){
	console.log("Yo you should see this!!");
	$scope.runMap = ()=> {
		//This needs scope to give it access to the partial.
		$window.location.href = "#!/map";
	};

});