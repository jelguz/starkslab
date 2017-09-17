myApp.controller('mainController', function($rootScope, $scope, $http, API_ENDPOINT) {


            $http
            .get(API_ENDPOINT.url + "/activity/notifications/" + $rootScope.globals.currentUser.username)
            .then(function(response) {
                $scope.myData = response.data;
                console.log($scope.myData);
            });
        


});

