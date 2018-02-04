myApp.controller('navController', ['$scope','$http', 'API_ENDPOINT' ,'$rootScope', '$location', function($scope, $http, API_ENDPOINT , $rootScope, $location){

	$scope.isActive = function(destination){
		return destination === $location.path();
	}
	
	$rootScope.getNotifs = function(username){
		$scope.newNotif = 0;
		$http
		.get(API_ENDPOINT.url + "/activity/notifications/" + username)
		.then(function(response) {
			$scope.myNotif = response.data;
			console.log($scope.myNotif);
			for (var i=0; i < $scope.myNotif.length; i++){		
				if ($scope.myNotif[i].isSeen == 0){
					$scope.newNotif = $scope.newNotif + 1;
				}
			}
		});
		
	}
	
	$rootScope.seen = function(username, newsfeedId, toolId, type){
		console.log(API_ENDPOINT.url + "/activity/notification/seen/" + username + "/" + newsfeedId);
		$http
		.get(API_ENDPOINT.url + "/activity/notification/seen/" + username + "/" + newsfeedId)
		.then(function(response) {
			$scope.seenResponse = response.data;
			if(type === "WISHERS")
				$location.path('/starkAppIncubator');
			else
				$location.path('/starkApp').search('id', toolId);
			console.log($scope.seenResponse);
		});
	}
	
	$rootScope.getNotificationClass = function(isSeen){
		if (isSeen == 0)
			return "list-group-item list-group-item-unseen";
		else
			return "list-group-item";
	}
	
	if($rootScope.globals.currentUser != null){
		$scope.myNotif = "";
		var currentUser = $rootScope.globals.currentUser;
		$rootScope.getNotifs(currentUser.username);
		//console.log(currentUser);
	}
	
	
	
	
	
	
   
}]);

