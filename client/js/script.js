'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

var myApp = angular.module('myApp', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
]);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

	//$httpProvider.defaults.useXDomain = true;
     //   delete $httpProvider.defaults.headers.common['X-Requested-With'];
	 //$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

	$routeProvider

		.when('/', {
			templateUrl : 'partials/dashboard.html',
			controller  : 'mainController'
		})

		.when('/login', {
			templateUrl : 'views/login.ejs',
			controller  : 'loginController'
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
		})

		.when('/starkApp', {
			templateUrl : 'partials/starkAppPage.html',
			controller  : 'starkAppPageController'
		})

		.when('/starkAppIncubator', {
			templateUrl : 'partials/starkAppIncubator.html',
			controller  : 'starkAppIncubatorController'
		})

		 // .otherwise({ redirectTo: '/login' })
		 ;

		$locationProvider.html5Mode(true);

		}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }])
;

		
