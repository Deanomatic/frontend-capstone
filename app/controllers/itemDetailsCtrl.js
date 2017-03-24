"use strict";

app.controller('itemDetailsCtrl', function ($scope, $routeParams, UserdataFactory, AuthFactory){
	$scope.item = [];
 
	let user = AuthFactory.getUser();

	UserdataFactory.getItemList(user)
	.then(function(itemCollection){
		$scope.item = itemCollection;

		$scope.selectedItem = $scope.item.filter(function(item){
			return item.id === $routeParams.itemId;
		})[0];
	});
});
