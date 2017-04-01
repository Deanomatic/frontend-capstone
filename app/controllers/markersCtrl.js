"use strict";

app.controller("markersCtrl", function($scope, $window, UserdataFactory, AuthFactory){
	let user = AuthFactory.getUser();
	// Runmap is changing the view to map partial. 
	$scope.runMap = ()=> {
		//This needs scope to give it access to the partial.
		$window.location.href = "#!/map";
	};
	$(document).ready(function(){
	    $('.tooltipped').tooltip({delay: 50});
	});
});