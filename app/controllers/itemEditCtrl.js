"use strict";  

app.controller("itemEditCtrl", function($scope, $location, $routeParams, UserdataFactory){
  
  $scope.title = "Edit Item";
  $scope.btnText = "Update";
  $scope.newTask = {};

$scope.addNewList = function(){
  UserdataFactory.getSingleItem($routeParams.itemId)
  .then(function successCallback(response){
     console.log("getSingleItemresponse", response);
      $scope.newTask = response;
  });
};
    
  $scope.addNewItem = function(){
    UserdataFactory.updateItem($routeParams.itemId, $scope.newTask)
    .then(function successCallback(response) {  
      console.log(response);
      $location.url("#!/sightings");
    });
  };
});