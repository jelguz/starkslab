'use strict';
  
myApp.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'API_ENDPOINT',
    function ( $http, $cookieStore, $rootScope, $timeout, API_ENDPOINT) {
        var service = {};
 
        service.Login = function (username, password, callback) {
 
            $http.post(API_ENDPOINT.url + '/login', { "id": username, "password": password })
               .then(function (response) {
                    alert(response);
                   callback(response);
               });
 
        };
  
        service.SetCredentials = function (username, successfulLogin, firstName, lastName, email) {
            var authdata = successfulLogin;
  
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    authdata: authdata
                }
            };
  
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };
  
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
  
        return service;
    }]);