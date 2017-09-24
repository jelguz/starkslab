myApp.controller('starkAppPageController', function($scope, $location, API_ENDPOINT, $http, AuthenticationService, $rootScope, $q) {

	$scope.appId = $location.search().id; 

	$scope.loadPage = function () {
		$http
		.get(API_ENDPOINT.url + "/tools/get/list/" + $scope.appId)
		.then(function(response) {
	    	$scope.appData = response.data;

	    	//TODO make this date formatter a seperate global function
			var st = $scope.appData.updateDate;
			var pattern = /(\d{4})(\d{2})(\d{2})/;
			$scope.appData.formattedUpdateDate = new Date(st.toString().replace(pattern, '$1-$2-$3'));

	    });
	};

		function downloadExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/tools/download/get/' + $scope.appId + '/' + $rootScope.globals.currentUser.username)
			.then(function(response){
				if (response.data.length == 0) {
					deferred.resolve(false);
				} else { 
					deferred.resolve(true);
				}
			});
			return deferred.promise;
		}
		

    $scope.downloadApp = function () {
    	downloadExistsInDB().then(function(response){
			if (response == false) {
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

			} else {
				alert("Download started. You have already downloaded this app version before and download count is not incremented");
			}
			
		});
    	
    };

    function reviewExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/tools/review/get/' + $scope.appId + '/' + $rootScope.globals.currentUser.username)
			.then(function(response){
				if (response.data.length == 0) {
					deferred.resolve(false);
				} else { 
					deferred.resolve(true);
				}
			});
			return deferred.promise;
		}



    $scope.rateApp = function () {
    	
		reviewExistsInDB().then(function(response){
			if (response == false) {
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

			} else {
				AuthenticationService.updateRating($scope.appId, $rootScope.globals.currentUser.username, 
					$scope.userRating, $scope.userReview, function(response) {

				        if(response.data == true) {
				            alert("Thanks for rating! Your previous rating and review for this app version have been updated.");
				            $scope.loadPage();
				        } else {
				            $scope.error = response.message;
				            $scope.dataLoading = false;
				            alert("Unable to rate app");
				        }
				    
				});
			}
			
		});

    	
    };

    $scope.loadPage();

});
