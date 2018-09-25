myApp.controller('starkAppCenterController', ['$scope', '$q', '$timeout', 'API_ENDPOINT', '$http', function($scope, $q, $timeout, API_ENDPOINT, $http){
    'use strict';
	
		/*
		//** Optimized Pagination . DO NOT DELETE. 
		//** This can be used and enhanced further once performance issue arises.
		//** The code below is a redesign of pagination by using partial request from backend.
		//** ~Mark
		
		
		$http
		.get("http://mancswcbman0128:8080/rest/tools/get/maxpage/12")
		.then(function(response) {
			$scope.myDataPages = response.data;
			var maxPage = parseInt($scope.myDataPages.maxPage);
	
			var range = [];
			for(var i=1;i <= maxPage; i++) {
			range.push(i);
			}
			$scope.currentPage = 1;
			$scope.pageRange = range;
			$scope.maxPage = maxPage;
			
		});
		
		$scope.getActivePage = function (page) {
		if($scope.currentPage == page)
			return 'active';
		}
		
		$scope.getPrevPageButtonClass = function () {
		if($scope.currentPage == 1)
			return 'disabled';
		}
		
		$scope.prevClick = function() {
				if ($scope.currentPage > 1){
					$scope.currentPage = $scope.currentPage - 1;
					$http
					.get("http://mancswcbman0128:8080/rest/tools/get/rating/desc/12/" + $scope.currentPage)
					.then(function(response) {
						$scope.myData = response.data;
						console.log(response.data);
					});
				}
			};
			
		$scope.getNextPageButtonClass = function () {
		if($scope.currentPage == $scope.maxPage)
			return 'disabled';
		}
			
		$scope.nextClick = function() {
				if ($scope.currentPage < $scope.maxPage){
					$scope.currentPage = $scope.currentPage + 1;
					$http
					.get("http://mancswcbman0128:8080/rest/tools/get/rating/desc/12/" + $scope.currentPage)
					.then(function(response) {
						$scope.myData = response.data;
						console.log(response.data);
					});
				}
			};
			
			
		
	
		$scope.click = function(page) {
			$http
			.get("http://mancswcbman0128:8080/rest/tools/get/rating/desc/12/" + page)
			.then(function(response) {
				$scope.myData = response.data;
				console.log(response.data);
			});
			$scope.currentPage = page;
		};
	
		*******************************END PAGINATION Test ***********************************/
	  
		//******************************** Initialize *****************************************
		$scope.currentCategory = 0; // Current selected category of user
		$scope.allItemsCount = 0;  // Number of Items
	  
		//** Get Category List
		$http
		.get(API_ENDPOINT.url + "/categories/get/listdetails/live")
		.then(function(response) {
			$scope.listCategories = response.data;
			//console.log(response.data);
		});
		
		//** Get All items on first load
		$http
		.get(API_ENDPOINT.url + "/tools/getall/live")
		.then(function(response) {
			$scope.myData = response.data;
			$scope.allItemsCount = $scope.myData.length;
			//console.log(response.data);
		});
		
		//**************************** Filter Category ****************************************
		
		//** Backend Request
		//** A dynamic category was selected, go get a new list by request
		$scope.goCategory = function(category) { 
				$http
				.get(API_ENDPOINT.url + "/tools/get/category/" + category + "/live")
				.then(function(response) {
					$scope.myData = response.data;
					//console.log(response.data);
				});
				$scope.currentCategory = category;
		};
		
		//** All Category was selected, go get a new list by request
		$scope.goAllCategory = function() { 
				$http
				.get(API_ENDPOINT.url + "/tools/getall/live")
				.then(function(response) {
					$scope.myData = response.data;
					//console.log(response.data);
				});
				$scope.currentCategory = 0;
		};
		
		//** Category Class Controller
		//** Determine which button will be activated and set class to 'Active'
		$scope.getActiveCategoryClass = function (category) {
		  if($scope.currentCategory == category)
			  return 'active';
		}
		
		$scope.getActiveAllCategoryClass = function () {
		  if($scope.currentCategory == 0)
			  return 'active';
		}
		
		//**************************** Functions ****************************************
	
        $scope.ratedCallback = function () {
            alert('The rated value is: '+$scope.model.callbacks);
            console.log('The rated value is: '+$scope.model.callbacks);
        };

        $scope.resetCallback = function () {
            alert('Reset clicked!');
            console.log('Reset clicked!');
        };

        $scope.confirmReset = function () {
            var d = $q.defer(); 
            if(confirm('Are you sure about resetting this rating?')){
                d.resolve();
            }else{
                d.reject();
            }
            return d.promise;
        };

        $scope.confirmRating = function (newRating) {
            var d = $q.defer(); 

            $timeout(function  () {
                if(confirm('Are you sure about rating us with '+newRating+' stars?')){
                    d.resolve();
                }else{
                    d.reject();
                }
            });
            
            return d.promise;
        };

        $scope.confirmReset = function () {
            var d = $q.defer(); 
            if(confirm('Are you sure about resetting this rating?')){
                d.resolve();
            }else{
                d.reject();
            }
            return d.promise;
        };
		
		//*** PAGE START
		//** PAGE END

    }
]);


myApp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(app){

			if(app.name.toLowerCase().indexOf(searchString) !== -1 ){ //** Filter by name
				result.push(app);
			}else if(app.description.toLowerCase().indexOf(searchString)!== -1 ){ //** Filter by description
				result.push(app);
			}else if(app.categoryString != null & app.categoryString.toLowerCase().indexOf(searchString)!== -1 ){ //** Filter by category
				result.push(app);
			}else if(app.tagsString != null && app.tagsString.toLowerCase().indexOf(searchString)!== -1 ){ //** Filter by tags
				result.push(app);
			}
			

		});

		return result;
	};

});


