myApp.controller('starkAppCenterController', function($scope, $http, API_ENDPOINT) {
	$http
	.get(API_ENDPOINT.url + "/tools/get/rating/desc/12/1")
	.then(function(response) {
      	$scope.myData = response.data;
    });
	

});

myApp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(app){

			if(app.name.toLowerCase().indexOf(searchString) !== -1){
				result.push(app);
			}

		});

		return result;
	};

});
