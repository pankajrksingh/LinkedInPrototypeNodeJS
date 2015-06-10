var LinkedInUserActions = angular.module('LikedInApp');


LinkedInUserActions.controller('UserActions', function ($scope, $http, $location, $window, $rootScope) {
	
	$scope.connectUser = function($connectinguserid)
	{
		//console.log("connectinguserid : " + $connectinguserid);
    	$http.post('/makeuserconnection', {UName : $window.sessionStorage.UserId, connectuser : $connectinguserid}).success(function(data) {
    		//console.log("Connecting user details : " + JSON.stringify(data));
        	$location.path('/pendinguser');
        }).error(function(status, data) {
            console.log(status);
            console.log(data);
        });
	};
	
	
	$scope.getUserConnections = function()
	{
		console.log("Inside get User connections");
    	$http.post('/findConnections', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		console.log("Connected User details : " + JSON.stringify(data));
    		$scope.userconnectedmembers = data;
        }).error(function(status, data) {
            console.log(status);
            console.log(data);
        });
	};
	
	$scope.getPendingConnections = function()
	{
		console.log("Inside get Pending User connections");
    	$http.post('/getPendingConnections', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		console.log("Pending connection User details : " + JSON.stringify(data));
    		$scope.userconnectedmembers = data;
        }).error(function(status, data) {
            console.log(status);
            console.log(data);
        });
	};
	
	$scope.routeToSerchUser = function(){
    	$rootScope.SearchUserId = $scope.searhUserValue;
    	$location.path('/userSearch');
	};
	
	$scope.searchUserfromConnections = function($inputSearchUserName, $inputSearchLastName){
    	$rootScope.SearchUserId = $inputSearchUserName + " " + $inputSearchLastName;
    	$location.path('/userSearch');
	};
	
	
	$scope.searchUser = function()
	{
		console.log("$rootScope.SearchUserId : " + $rootScope.SearchUserId);
		console.log("$scope.searhUserValue : " + $scope.searhUserValue);
		if($scope.searhUserValue == undefined)
		{
			if($rootScope.SearchUserId != undefined || $rootScope.SearchUserId != "")
			{
				$scope.searhUserValue = $rootScope.SearchUserId;
				console.log("$scope.searhUserValue : " + $scope.searhUserValue);
			}
		}
		if($scope.searhUserValue != undefined)
		{
	    	$http.post('/searchUserDetails', {UName : $scope.searhUserValue}).success(function(data) {
	    		console.log("Connected User details : " + JSON.stringify(data));
	    		if(data.length > 0 && data[0].username != undefined)
				{
	    			var serchUsername = data[0].username;
	    			console.log("serchUsername " + serchUsername);
	    			
	    			$scope.searchuserId = data[0].username;
	        		$scope.searcheduserName = data[0].firstname + " " + data[0].lastname;
	        		$scope.searcheduserSummary = data[0].summary;
	        		$scope.searcheduserStatus = true;
	        		if(serchUsername == $window.sessionStorage.UserId)
	    			{
	        			$scope.searcheduserStatus = false;
	    			}
	    	    	$http.post('/getUserstatus', {UName : $window.sessionStorage.UserId, searchname : serchUsername}).success(function(data) {
	    	    		console.log("Get User Status details : " + JSON.stringify(data));
	    	    		if(data.length > 0 && data[0].status == 1)
		    			{
	    	    			$scope.searcheduserStatus = false;
	    	    	    	$http.post('/getUserExperince', {UName : serchUsername}).success(function(data) {
	    	    	    		console.log("User Experince details : " + JSON.stringify(data));
	    	    	    		$scope.searcheduserExperience=data;
	    	    	        }).error(function(status, data) {
	    	    	            console.log(status);
	    	    	            console.log(data);
	    	    	        });
	    	    	    	
	    	    	    	$http.post('/getUserSkills', {UName : serchUsername}).success(function(data) {
	    	    	    		console.log("User Skills details : " + JSON.stringify(data));
	    	    	    		$scope.searcheduserSkillList=data;
	    	    	        }).error(function(status, data) {
	    	    	            console.log(status);
	    	    	            console.log(data);
	    	    	        });
	    	    	        
	    	    	    	$http.post('/getUserEdu', {UName : serchUsername}).success(function(data) {
	    	    	    		console.log("User Education details : " + JSON.stringify(data));
	    	    	    		$scope.searcheduserEducationList=data;
	    	    	        }).error(function(status, data) {
	    	    	            console.log(status);
	    	    	            console.log(data);
	    	    	        });
		    			}
	    	        }).error(function(status, data) {
	    	        	//$location.path('/');
	    	            console.log(status);
	    	            console.log(data);
	    	        });

				}
	        }).error(function(status, data) {
	            console.log(status);
	            console.log(data);
	        });
		}

	};

});