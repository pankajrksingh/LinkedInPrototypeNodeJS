var MyApplication = angular.module('LikedInApp', ['ngRoute', 'ngMaterial', 'xeditable']);



//Creating theAngulrJS Routes
MyApplication.config(['$locationProvider', '$routeProvider','$httpProvider', 
	function($locationProvider, $routeProvider,$httpProvider) {
	  $routeProvider.
	      when('/', {
	          templateUrl: '/loginpage',
	          controller : 'LoginController'
	        	
	      }).
	      when('/home', {
	          templateUrl: '/homepage'
	      }).
          when('/connections', {
              templateUrl : '/connectedUsers',
          }).
          when('/pendinguser', {
              templateUrl : '/pendingconnections',
          }).                   
          when('/userSearch', {
              templateUrl : '/searchUser',
          }). 
	      otherwise({
	          redirectTo: '/'
	      });
	  $httpProvider.interceptors.push('TokenInterceptor');
}]);


MyApplication.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});


MyApplication.run(function($rootScope, $location, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute != null && !$window.localStorage.token) {
        	//console.log("$window.localStorage.token : " + $window.localStorage.token);
        	$location.path('/');
        }
        else
    	{
            if($location.path() == '/')
        	{
            	$location.path('/home');
        	}
            if($location.path() == '/connections')
        	{
            	$location.path('/connections');
        	}
    	}
    });
});


//Fetched the token from the client
MyApplication.factory('TokenInterceptor', function ($q, $window, $location) {
	console.log("Inside Token Inceptor");
    return {
        request: function (config) {
        	
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
            	console.log("TokenInterceptor : " + $window.localStorage.token);
                config.headers.Authorization = $window.localStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && $window.localStorage.token) {
                //delete $window.localStorage.token;
                $window.location = '/';
            }

            return $q.reject(rejection);
        }
    };
});

