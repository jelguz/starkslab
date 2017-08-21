// var myApp = angular.module('myApp', [
// 	'ngRoute']).
// 	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
// 		$routeProvider.when('/home', {templatUrl: 'partials/home.html', controller: 'homeController'});
// 		$routeProvider.otherwise({redirectTo: '/home'});
	
// 		$locationProvider.html5Mode({enabled: true, requireBase:false});
// 	}]);


// create the module and name it scotchApp
var myApp = angular.module('myApp', ['ngRoute']);

// configure our routes
myApp.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/home', {
			templateUrl : 'partials/home.html',
			controller  : 'homeController'
		})

});

myApp.controller('homeController', function($scope) {
	$scope.message = 'Everyone come and see how good I look!';
});
