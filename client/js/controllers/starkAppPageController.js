myApp.controller('starkAppPageController', function($scope, $location, API_ENDPOINT, $http, AuthenticationService, $rootScope, $q) {

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
			
			//test tool type
			var dt = $scope.appData.type;
			var instruction;
			if (dt == "file") {
				instruction = "DOWNLOAD";
			} else if (dt == "link") {
				instruction = "VISIT WEBSITE";
			} else {
				instruction = "DOWNLOAD MANUAL";
			}
			$scope.appData.formattedType = instruction;
			
			
				});
			};
		
		$scope.getIconClass = function (type) {
		  if(type == "link")
			  return 'fa fa-external-link';
		  else if (type == "file")
			  return 'fa fa-cloud-download';
		  else
			  return 'fa fa-book';
		}
		
		function downloadExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/tools/checkdownload/' + $scope.appId + '/' + $rootScope.globals.currentUser.username)
			.then(function(response){
				deferred.resolve(response.data);
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

			} else if (response == true) {
				alert("Download started. Download count is not incremented.");
			} else {
				alert("Error");
			}
			
		});
    	
    };
	
	    //Veejay start (DOWNLOAD)
    	$scope.downloadApp1 = function () {
		
		$http
		.get(API_ENDPOINT.url + "/tools/get/currentversion/" + $scope.appId)
		.then(function(response) {
			
			$scope.dlLink = response.data.downloadLink;
			console.log("DOWNLOAD 1")
			if ($scope.dlLink != undefined) 
				{
					alert("Download Started");
					window.location.href =  $scope.dlLink;
					$scope.loadPage();
					console.log("DOWNLOAD START")
				} else {
					alert("Unable to download, file not available");
					console.log("DOWNLOAD END")
				}

    });
	
	/*
	 $scope.getImage = function(username) { 
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
		
};


	//Veejay end (DOWNLOAD)

    function reviewExistsInDB(){
			var deferred = $q.defer();
			$http.get(API_ENDPOINT.url + '/tools/get/review/' + $scope.appId + '/' + $rootScope.globals.currentUser.username)
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
