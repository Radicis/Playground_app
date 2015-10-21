'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
	.controller('PlaygroundCtrl', function ($scope, playgroundService) {

		$scope.markerList = [];
		$scope.markers = [];
		$scope.mapCenter;

		$scope.selectedMarker = {};
		$scope.showSelectedMarker = false;

		$scope.selectMarker= function(marker){
			$scope.selectedMarker.title= marker.m.options.title;
			$scope.selectedMarker.location= marker.m.options.location;
			$scope.selectedMarker.size= marker.m.options.size;
			$scope.showSelectedMarker = true;
			$scope.$apply();
		};

		var promise = playgroundService.getPlaygrounds();
		promise.then(function(response){
			$.each(response.data, function(index){
				var marker = {
					id: Date.now(),
					options: {
						title: response.data[index].name,
						location: response.data[index].location,
						size: response.data[index].size
					},
					coords: {
						latitude: response.data[index].geoLat,
						longitude: response.data[index].geoLng
					}
				};
				$scope.markerList.push(marker);
			})
		});


		angular.extend($scope, {
			map: {
				center: {
					latitude: 53.41291,
					longitude:-8.24389
				},
				zoom: 7,
				markers: $scope.markerList,
				events: {
				}
			}
		});

	});





angular.module('playgroundApp').service('playgroundService', function($http, $q){
	var deferred = $q.defer();
	$http.get('http://localhost/playground/rest/api/playground/playgrounds/').then(function(data){
		deferred.resolve(data);
	})

	this.getPlaygrounds = function(){
		return deferred.promise;
	}
});
