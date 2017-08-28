myApp.controller('starkAppCenterController', function($scope, $http, API_ENDPOINT) {
$http
	.get(API_ENDPOINT.url + "/tools/get/rating/desc/12/1")
	.then(function(response) {
    	$scope.myData = response.data;
    });
});
