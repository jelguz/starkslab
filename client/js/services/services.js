'use strict';
  
myApp.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout', 'API_ENDPOINT',
    function ( $http, $cookieStore, $rootScope, $timeout, API_ENDPOINT) {
      var service = {};
		
      service.Login = function (username, password, callback) {
        $http({
            method: 'POST',
            url: API_ENDPOINT.url + '/login',
            data: { 'id': username, 'password': password },
            headers: {  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }
          })
        .then(function successCallback(response) {
          callback(response);
        }, function errorCallback(response) {
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

        service.addDownloadCount = function (tool_id, user_id, callback) {
            $http.get(API_ENDPOINT.url + '/tools/download/' + tool_id + '/' + user_id )
           .then(function (response) {
               callback(response);
           });
        };

        service.addRating = function (tool_id, user_id, rating, review, callback) {
          $http({
              method: 'POST',
              url: API_ENDPOINT.url + '/tools/rate',
              data: {"id" : tool_id, "personId" : user_id , "rating" : rating, "text" : review  },
              headers: {  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            })
          .then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response) {
            callback(response);
          });

        };
  
        service.updateRating = function (tool_id, user_id, rating, review, callback) {
          $http({
              method: 'POST',
              url: API_ENDPOINT.url + '/tools/review/update',
              data: {"id" : tool_id, "personId" : user_id , "rating" : rating, "text" : review },
              headers: {  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }
            })
          .then(function successCallback(response) {
            callback(response);
          }, function errorCallback(response) {
            callback(response);
          });

        };

        return service;
    }]);