myApp.controller('starkAppAddConceptController', ['$scope', '$q', '$timeout', '$location', 'API_ENDPOINT','AuthenticationService', '$rootScope', '$http', function($scope, $q, $timeout, $location, API_ENDPOINT,AuthenticationService, $rootScope, $http){
    'use strict';
		
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
			
	$scope.addTool = function () {
    	
		AuthenticationService.addTool($scope.conceptName, $scope.conceptDesc, 
			$scope.defaultStatus, $rootScope.globals.currentUser.username, $scope.selectedcategory , 
			function(response) {
				if(response.data == true) {
				    alert("Thanks for adding your concept!");
									console.log($scope.conceptStat);

					$location.path('/starkAppIncubator');
				} else {
				    $scope.error = response.message;
				    $scope.dataLoading = false;
				    alert("Unable to add concept");
				}
				    
			});
					
		};
		
		
		
	$scope.setCategory = function (category) {
			$scope.selectedcategory = category;
		};	
	
    //$scope.loadPage();

}
]);