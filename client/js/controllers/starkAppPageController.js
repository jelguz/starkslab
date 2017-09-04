myApp.controller('starkAppPageController', function($scope, $location, API_ENDPOINT, $http, AuthenticationService, $rootScope) {

	$scope.appId = $location.search().id; 

	$scope.loadPage = function () {
		$http
		.get(API_ENDPOINT.url + "/tools/get/" + $scope.appId)
		.then(function(response) {
	    	$scope.appData = response.data;

	    	//TODO make this date formatter a seperate global function
			var st = $scope.appData.updateDate;
			var pattern = /(\d{4})(\d{2})(\d{2})/;
			$scope.appData.formattedUpdateDate = new Date(st.toString().replace(pattern, '$1-$2-$3'));

	    });
	};

    $scope.downloadApp = function () {
    	AuthenticationService.addDownloadCount($scope.appId, $rootScope.globals.currentUser.username, function(response) {
                if(response.data == true) {
                    alert("Download started");
                    $scope.loadPage();
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    alert("Unable to download");
                }

            });
    };

    $scope.rateApp = function () {
    	AuthenticationService.addRating($scope.appId, $rootScope.globals.currentUser.username, 
    		$scope.userRating, $scope.userReview, function(response) {

	            if(response.data == true) {
	                alert("Thanks for rating!");
	                $scope.loadPage();
	            } else {
	                $scope.error = response.message;
	                $scope.dataLoading = false;
	                alert("Unable to rate app");
	            }
	        
        });
    };

    $scope.loadPage();

});
