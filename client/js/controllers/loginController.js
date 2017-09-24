'use strict';
  
myApp.controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http', 'API_ENDPOINT', '$q',
    function ($scope, $rootScope, $location, AuthenticationService, $http, API_ENDPOINT, $q) {
    	    	
        $scope.login = function () {
            // reset login status
            AuthenticationService.ClearCredentials();
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.data.successfulLogin == true) {
                	$scope.getNotifs($scope.username);

                    AuthenticationService.SetCredentials(response.data.id, response.data.successfulLogin, 
                        response.data.firstName, response.data.lastName, response.data.email);
					PersonExistsInDB().then(function(response){
						if (response == false) AddPersonToDB();
						$location.path('/');
					});
                } else {
                    $scope.error = response.message;
					console.log(response.message);
                    $scope.dataLoading = false;
					$("#loginErrorCollapse").collapse("show");
                }
            });
        };

        $scope.getNotifs = function(username){
			$http
			.get(API_ENDPOINT.url + "/activity/notifications/" + username)
			.then(function(response) {
				$scope.myNotif = response.data;
				console.log($scope.myNotif);
			});
		}

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };

		function PersonExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/persons/get/' + $rootScope.globals.currentUser.username)
			.then(function(response){
				if (response.data.length == 0) {
					deferred.resolve(false);
				} else { 
					deferred.resolve(true);
				}
			});
			return deferred.promise;
		}
		
		function AddPersonToDB(){
			var currentUser = $rootScope.globals.currentUser;
			var person = {
				id: currentUser.username,
				firstName: currentUser.firstName,
				lastName: currentUser.lastName,
				middleName: "",
			};
			$http.post(API_ENDPOINT.url + '/persons/add',person)
			.then(function(response){
			});
		}
		
		function CheckIfUserIsLoggedIn(){
			if ($rootScope.globals.currentUser != undefined && $rootScope.globals.currentUser || null) {
				$location.path('/');
			}
		}
		
		//CheckIfUserIsLoggedIn();
    }]);