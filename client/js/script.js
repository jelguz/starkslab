var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
	$routeProvider

		.when('/', {
			templateUrl : 'partials/dashboard.html',
			controller  : 'mainController'
		})

		.when('/starkAppCenter', {
			templateUrl : 'partials/starkAppCenter.html',
			controller  : 'starkAppCenterController'
		})

		.when('/starkGroups', {
			templateUrl : 'partials/starkGroups.html',
			controller  : 'starkGroupsController'
		})

		.when('/newsFeed', {
			templateUrl : 'partials/newsFeed.html',
			controller  : 'newsFeedController'
		})

		.when('/profileTimeline', {
			templateUrl : 'partials/profileTimeline.html',
			controller  : 'profileTimelineController'
		})

		.when('/profileStarkApp', {
			templateUrl : 'partials/profileStarkApp.html',
			controller  : 'profileStarkAppController'
		})

		.when('/profileGroups', {
			templateUrl : 'partials/profileGroups.html',
			controller  : 'profileGroupsController'
		})

		.when('/starkAppPage', {
			templateUrl : 'partials/starkAppPage.html',
			controller  : 'starkAppPageController'
		})

		.when('/groupPage', {
			templateUrl : 'partials/groupPage.html',
			controller  : 'groupPageController'
		})

		.when('/faq', {
			templateUrl : 'partials/faq.html',
			controller  : 'faqController'
		});

		$locationProvider.html5Mode(true);
});
