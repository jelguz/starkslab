myApp.controller('mainController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http', 'API_ENDPOINT', '$q',
    function ($scope, $rootScope, $location, AuthenticationService, $http, API_ENDPOINT, $q) {
	
		
		if($location.path() == '/'){
			$location.path('/starkAppCenter');
		}
		
		$scope.location = $location.path();
		
		$rootScope.getPageContainer = function(){
			if($location.path() == "/login")
				return "page-content-login";
			else
				return "page-content";
		};
	
        /*$rootScope.getImage = function(username) { 
			console.log('ASD');
			if(isImageExists(username))
				return 'assets/images/users/' + username + '.png';
			else
				return 'assets/images/users/noimage.png';
		};
		
		
		function isImageExists(username){
			//console.log(username);
			$http.get('assets/images/users/' + username + '.png')
			.done(function(){
				return true;
				
			}).fail(function(){
				return false;
			});
		}*/
		
}]);

myApp.directive('checkImage', function($http, $rootScope){
			return{
				restrict: 'A',
				link: function(scope, element, attrs){
					attrs.$observe('ngSrc', function(ngSrc) {
						$http.get(ngSrc).then(function successCallback(response) {
							
						},function errorCallback(response) {
							element.attr('src', 'assets/images/users/noimage.png');
						})
					});
				}
			};
});

myApp.directive('checkAppImage', function($http, $rootScope){
	console.log("HI");
			return{
				restrict: 'A',
				link: function(scope, element, attrs){
					attrs.$observe('ngSrc', function(ngSrc) {
						$http.get(ngSrc).then(function successCallback(response) {
							
						},function errorCallback(response) {
							element.attr('src', 'assets/images/appicons/NoPicture.png');
						})
					});
				}
			};
});
