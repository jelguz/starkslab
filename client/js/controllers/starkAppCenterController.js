myApp.controller('starkAppCenterController', function($scope, $http) {
$http
	.get("http://manvswbfeq17:8080/StarkLabWebService/rest/tools/get/rating/desc/12/1")
	.then(function(response) {
    	$scope.myData = response.data;
    });
});
