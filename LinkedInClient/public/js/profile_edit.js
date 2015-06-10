var LinkedInProfileEdit = angular.module('LikedInApp');

LinkedInProfileEdit.controller('DialogController',function($scope, $http, $window, $mdDialog, Summary) {
	
	$scope.Summary = Summary;
	  $scope.hide = function() {
	    $mdDialog.hide();
	  };
	  $scope.cancel = function() {
	    $mdDialog.cancel();
	  };
	  $scope.answer = function(answer) {
		  $mdDialog.hide(answer);	    
	  };


});
	
LinkedInProfileEdit.controller('ProfileEdit', function ($scope, $http, $location, $window, $rootScope, $mdDialog)
{
	
	  $scope.summaryEdit = function(ev, SummaryInput) {
		    $mdDialog.show({
		      controller: 'DialogController',
		      templateUrl: 'summaryform',
		      targetEvent: ev,
		      locals: {Summary : SummaryInput}
		    })
		    .then(function(answer) {
		    	  console.log("Calling updating Summary function " + answer);
		    	  editUserSummary(answer);
		    	  //$window.location = '/home' ;
		    }, function() {
		      $scope.alert = 'You cancelled the dialog.';
		    });
		  };
		  
		
		function editUserSummary(updatedSummary)
		  {
		  	$http.post('/updateUserSummary', {UName : $window.sessionStorage.UserId, updatedSummaryInfo : updatedSummary}).success(function(data) {
		  		//console.log("Update Summary details : " + JSON.stringify(data));
		  		//$scope.Summary = data.Summary;
		    	 // $location.path('/');
		      }).error(function(status, data) {
		          //console.log(status);
		          //console.log(data);
		      });
		  }
		
		  
});


