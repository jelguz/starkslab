myApp.controller('starkAppUploadController', ['$scope', '$q', '$timeout', '$location', 'API_ENDPOINT','AuthenticationService', '$rootScope', '$http', function($scope, $q, $timeout, $location, API_ENDPOINT,AuthenticationService, $rootScope, $http){
    'use strict';
	
	$scope.go = function ( path ) {
		$location.path( path );
	};
	
	$scope.isActive = function(destination){
		return destination === $location.path();
	}
	
	//** Get Category List
		$http
		.get(API_ENDPOINT.url + "/categories/get/listdetails/live")
		.then(function(response) {
			$scope.listCategories = response.data;
			if ($scope.listCategories.length > 0){
				$scope.selectedcategory = $scope.listCategories[0].id;
				$scope.defaultCategory = $scope.listCategories[0].name;
			}
			console.log(response.data);
		});
		$scope.defaultStatus = 'Idea';
	
	
}]);