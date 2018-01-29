myApp.controller('starkAppAddConceptController', function($scope, $q, $timeout, API_ENDPOINT, $http, $location) {
	
	$scope.loadPage = function () {
		$http
		.get(API_ENDPOINT.url + "/tools/get/" + $scope.appId)
		.then(function(response) {
	    	$scope.app = response.data;

			//test tool type
			var categ = $scope.app.categoryString;
			$scope.app.formattedCategories = categ;
			
			
				});
			};
	
    $scope.loadPage();

});