angular.module('EfficiencyApp', [ 'ngRoute', 'ngAnimate'])

/*
* Due to the CSS, these actually are loaded into the page from right to left (backwards), so put the most important links
* at the bottom of this list, so they will appear closest to the left.
*/
.controller('navController', [function($route, $routeParams) {
	this.links =[
		{linkName: 'Reports',
		URL: '#/reports',
		},
		{linkName: 'Home',
		URL: '#/home',
		}
	]
}])

.controller('contentController', ['$scope', '$location', function($scope, $route, $location) {
	
	/*
	* For toggling the WeChat QR code modal.
	*/
	$scope.showModal = false;
	$scope.openModal = function(){
		$scope.showModal = !$scope.showModal;
	};

  $scope.$on('$viewContentLoaded', function(){

    // Run after view loaded.
	  //The home page needs to access MySQL Total Hours save value
	  //The developer page needs to access MySQL to load the AutomationTypes
      getDataForPage();

  });

}])

.config(function($routeProvider) { //routing needs to be on a server in order to run
	$routeProvider
	.when('/',{
	templateUrl: 'views/home.html',
    controller: 'contentController',
	})
	.when('/home',{
	templateUrl: 'views/home.html',
	controller: 'contentController',
	})
	.when('/developer', {
	templateUrl: 'views/developer.html',
	controller: 'contentController',
	})
	.when('/thanks', {
	templateUrl: 'views/thanks.html',
	controller: 'contentController',
	})
	.when('/reports', {
	templateUrl: 'views/reports.html',
	controller: 'contentController'
	});
})
