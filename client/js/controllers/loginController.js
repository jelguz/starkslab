'use strict';
  
myApp.controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        
  
        $scope.login = function () {
            // reset login status
            AuthenticationService.ClearCredentials();
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.data.successfulLogin == true) {
                    AuthenticationService.SetCredentials(response.data.id, response.data.successfulLogin, 
                        response.data.firstName, response.data.lastName, response.data.email);
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
        }
    }]);