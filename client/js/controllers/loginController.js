'use strict';
  
myApp.controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http', 'API_ENDPOINT',
    function ($scope, $rootScope, $location, AuthenticationService, $http, API_ENDPOINT) {
        
  
        $scope.login = function () {
            // reset login status
            AuthenticationService.ClearCredentials();
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.data.successfulLogin == true) {
                    AuthenticationService.SetCredentials(response.data.id, response.data.successfulLogin, 
                        response.data.firstName, response.data.lastName, response.data.email);
					$scope.loadNotifs;
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };

    }]);