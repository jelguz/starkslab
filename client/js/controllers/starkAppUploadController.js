myApp.controller('starkAppUploadController', ['$scope', '$location', function($scope, $location){

	$scope.isActive = function(destination){
		return destination === $location.path();
	}
}]);