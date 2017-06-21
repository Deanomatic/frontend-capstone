"use strict";

app.controller("markersCtrl", function($scope, $window, UserdataFactory, AuthFactory, IconsFactory){
	let user = AuthFactory.getUser();
	// Runmap is changing the view to map partial. 
	$scope.runMap = (icon)=> {
		IconsFactory.setsavedinfo(icon)
		//This needs scope to give it access to the partial.
		$window.location.href = "#!/map";
	};
	$scope.runBuck = ()=> {
		
	};
	$(document).ready(function(){
	    $('.tooltipped').tooltip({delay: 50});
	});
});