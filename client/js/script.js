	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				templateUrl : 'partials/dashboard.html',
				controller  : 'mainController'
			})

			.when('/starkAppCenter', {
				templateUrl : 'partials/starkAppCenter.html',
				controller  : 'starkAppCenterController'
			})

			// route for the contact page
			.when('/starkGroups', {
				templateUrl : 'partials/starkGroups.html',
				controller  : 'starkGroupsController'
			})

			
			.when('/newsFeed', {
				templateUrl : 'partials/newsFeed.html',
				controller  : 'newsFeedController'
			});

			$locationProvider.html5Mode(true);
	});
