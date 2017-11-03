myApp.controller('starkAppCenterController', ['$scope', '$q', '$timeout', '$http', function($scope, $q, $timeout, $http){
    'use strict';

  $http
    .get("http://mancswcbman0128:8080/rest/tools/get/rating/desc/12/1")
    .then(function(response) {
        $scope.myData = response.data;
        console.log(response.data);
    });


        $scope.ratedCallback = function () {
            alert('The rated value is: '+$scope.model.callbacks);
            console.log('The rated value is: '+$scope.model.callbacks);
        };

        $scope.resetCallback = function () {
            alert('Reset clicked!');
            console.log('Reset clicked!');
        };

        $scope.confirmReset = function () {
            var d = $q.defer(); 
            if(confirm('Are you sure about resetting this rating?')){
                d.resolve();
            }else{
                d.reject();
            }
            return d.promise;
        };

        $scope.confirmRating = function (newRating) {
            var d = $q.defer(); 

            $timeout(function  () {
                if(confirm('Are you sure about rating us with '+newRating+' stars?')){
                    d.resolve();
                }else{
                    d.reject();
                }
            });
            
            return d.promise;
        };

        $scope.confirmReset = function () {
            var d = $q.defer(); 
            if(confirm('Are you sure about resetting this rating?')){
                d.resolve();
            }else{
                d.reject();
            }
            return d.promise;
        };

    }
]);

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
