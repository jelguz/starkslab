myApp.controller('starkAppCenterController', function($scope, $http) {
$http
	.get("http://localhost:8080/StarkLabWebService/rest/tools/get/rating/desc/4/1")
	.then(function(response) {
    	$scope.myData = response;
    });
});
