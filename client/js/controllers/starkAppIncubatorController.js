myApp.controller('starkAppIncubatorController', function($scope, $q, $timeout, API_ENDPOINT, $rootScope, $http, $location) {
	
	$scope.removeLastChar = function (str1) {
		var str2 = str1.slice(0, -1);
		return str2;
	}
	
	$scope.getDays = function (day1) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = yyyy+mm+dd;
		
		day1 = day1.replace(/\d{1,2}[\-|\.|\/]\d{1,2}[\-|\.|\/]\d{2,4}/g);
		
		var day2 = today - day1;
		return day1;
	}
	
	$scope.go = function ( path ) {
		$location.path( path );
	};
	
	//******************************** Initialize *****************************************
		$scope.currentCategory = 0; // Current selected category of user
		$scope.allItemsCount = 0;  // Number of Items
	  
		//** Get Category List
		$http
		.get(API_ENDPOINT.url + "/categories/get/listdetails/idea")
		.then(function(response) {
			$scope.listCategories = response.data;
			console.log(response.data);
		});
		
		//** Get All items on first load
		$http
		.get(API_ENDPOINT.url + "/tools/getall/idea")
		.then(function(response) {
			$scope.myData = response.data;
			$scope.allItemsCount = $scope.myData.length;
			console.log(response.data);
		});
		
		//**************************** Filter Category ****************************************
		
		//** Backend Request
		//** A dynamic category was selected, go get a new list by request
		$scope.goCategory = function(category) { 
				$http
				.get(API_ENDPOINT.url + "/tools/get/category/" + category + "/idea")
				.then(function(response) {
					$scope.myData = response.data;
					console.log(response.data);
				});
				$scope.currentCategory = category;
		};
		
		
		$scope.upvote = function (id) {
			$http
					.get(API_ENDPOINT.url + "/tools/upvote/" + id + "/"+ $rootScope.globals.currentUser.username)
					.then(function(response) {
						$scope.myData = response.data;
						alert(response.data);
					});
		}
		
		//** All Category was selected, go get a new list by request
		$scope.goAllCategory = function() { 
				$http
				.get(API_ENDPOINT.url + "/tools/getall/idea")
				.then(function(response) {
					$scope.myData = response.data;
					console.log(response.data);
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
		
});


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





