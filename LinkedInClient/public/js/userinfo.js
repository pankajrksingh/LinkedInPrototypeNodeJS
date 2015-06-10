var LinkedInUserInfo = angular.module('LikedInApp');


LinkedInUserInfo.controller('UserDetails', function ($scope, $http, $location, $window, $rootScope) {
	
	$scope.getUserDetail = function()
	{
    	$http.post('/getUserSummary', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		//console.log("User details : " + JSON.stringify(data));
    		$scope.Name = data.Name;
    		$scope.lastlogin = data.LastLogin;
    		$scope.Summary = data.Summary;
        }).error(function(status, data) {
            //console.log(status);
            //console.log(data);
        });
    	
    	$http.post('/getUserExperince', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		//console.log("User Experince details : " + JSON.stringify(data));
    		$scope.userExperience=data;
        }).error(function(status, data) {
            //console.log(status);
            //console.log(data);
        });
    	
    	$http.post('/getUserSkills', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		//console.log("User Skills details : " + JSON.stringify(data));
    		$scope.SkillList=data;
        }).error(function(status, data) {
            //console.log(status);
            //console.log(data);
        });
        
    	$http.post('/getUserEdu', {UName : $window.sessionStorage.UserId}).success(function(data) {
    		//console.log("User Education details : " + JSON.stringify(data));
    		$scope.EducationList=data;
        }).error(function(status, data) {
            //console.log(status);
            //console.log(data);
        });
    	
	};
});
	