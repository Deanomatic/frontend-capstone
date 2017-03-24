"use strict"; 

app.controller("sightingsCtrl", function($scope, AuthFactory, UserdataFactory, $location, $routeParams){
	//let user = AuthFactory.getuser();
	$scope.addSighting = false;
	$scope.showList = true;
	//Used to hide and 
	$scope.showForm = ()=> {
		$scope.addSighting = true;
		$scope.showList = false;
	};

	let user = AuthFactory.getUser();
	$scope.items = [];
    $scope.title = "New Todo"; 
    $scope.btnText = "Submit";
      
	$scope.newTask = {  
		assignedTo: "",
		dependencies: "",
		dueDate: "",
		isCompleted: false,
		location: "",
		task: "",
		urgency: "",
        uid: user
	};
	//This function allows us to create new sightings and plug it into the newTask object
	$scope.addNewItem = function(){
        console.log("add new item");
        UserdataFactory.postNewItem($scope.newTask)
        .then(function(response){
        	$location.url("#!/sightings");
        });
        // $scope.newTask.isCompleted = false;
        // $scope.newTask.id = $scope.items.length;
        console.log("you added new task:", $scope.newTask);
        // $scope.items.push($scope.newTask);
        $scope.newTask = {};
    };
    $scope.addNewList = function(){
	  UserdataFactory.getSingleItem($routeParams.itemId)
	  .then(function successCallback(response){
	     console.log("getSingleItemresponse", response);
	      $scope.newTask = response;
	  });
	};
	UserdataFactory.getItemList(user)
    .then(function(itemCollection){
        $scope.items = itemCollection;
        console.log("yo", $scope.items);
    }); 

    $scope.itemDelete = function(itemId){
        console.log("delete this item", itemId);
        UserdataFactory.deleteItem(itemId)
        .then(function(response){
            UserdataFactory.getItemList(user).then(function(itemCollection){
                $scope.items = itemCollection;
            });
        });
    };

});