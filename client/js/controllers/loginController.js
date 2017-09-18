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
                    AuthenticationService.SetCredentials(response.data.id, response.data.successfulLogin, 
                        response.data.firstName, response.data.lastName, response.data.email);
					PersonExistsInDB().then(function(response){
						if (response == false) AddPersonToDB();
						$scope.loadNotifs;
						$location.path('/');
					});
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
					console.log("BAD LOGIN");
					$("#loginErrorCollapse").collapse("show");
                }
            });
        };

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };

		function PersonExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/persons/get/' + $rootScope.globals.currentUser.username)
			.then(function(response){
				if (response.data.length == 0) {
					console.log("PERSON DOES NOT EXIST!");
					deferred.resolve(false);
				} else { 
					console.log("PERSON ALREADY EXISTS!");
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
		
    }]);