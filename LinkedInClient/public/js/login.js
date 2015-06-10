
var LinkedInModule = angular.module('LikedInApp');

LinkedInModule.controller('LoginController', function ($scope, $http, $location, $window, $rootScope) {

	$scope.login = function()
	{
        if ($scope.credentials.username !== undefined && $scope.credentials.username !== "" && $scope.credentials.password !== undefined && $scope.credentials.password !== "") {
        	$scope.ErrorMessage = "";
        	console.log("hello login");
        	$http.post('/signin', $scope.credentials).success(function(data) {
        		console.log("Successful login : " + data);
                $window.localStorage.token = data.token;
                $rootScope.isLoggedIn = true;
                $window.sessionStorage.UserId = $scope.credentials.username;
                $scope.Name = $window.sessionStorage.UserId;
                console.log("UserName : " + $scope.Name);
                //$window.location = '/home';
                $location.path('/home');
            }).error(function(status, data) {
            	delete $window.localStorage.token;
                console.log(status);
                console.log(data);
            });
        }
        else
        {
        	console.log("No Input");
        	$scope.ErrorMessage = "Input missing";
        	
    	}
	
	};
	
    $scope.logout = function logout() {
    	console.log("Inside logout function");
            delete $window.localStorage.token;
            delete $window.sessionStorage.UserId;
            $rootScope.isLoggedIn = false;
            $location.path('/');
    };
	
	$scope.signup = function()
	{
		console.log("hello signup");
		$http.post('/signup', $scope.details).success(function(data) {
			console.log(data);
			$location.path('/');
			$window.alert(data.signup);
			}).error(function(status, data) {
				$location.path('/');
				$window.alert(data.signup);
            });
		
	};
	
});
