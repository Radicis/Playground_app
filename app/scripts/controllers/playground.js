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
			$scope.selectedMarker.county= marker.m.options.county;
      $scope.selectedMarker.surface= marker.m.options.surface;
      $scope.selectedMarker.age= marker.m.options.age;
      $scope.selectedMarker.facilities= marker.m.options.facilities;
      $scope.selectedMarker.description= marker.m.options.description;
      $scope.selectedMarker.images= marker.m.options.images;
      $scope.selectedMarker.isEnclosed= marker.m.options.isEnclosed;
			$scope.showSelectedMarker = true;
			$scope.$apply();
		};

    $scope.selectMarkerById= function(id){

      $.each($scope.markerList, function(index){
          if($scope.markerList[index].id == id){
            $scope.selectedMarker.title= $scope.markerList[index].options.title;
            $scope.selectedMarker.location= $scope.markerList[index].options.location;
            $scope.selectedMarker.county= $scope.markerList[index].options.county;
            $scope.selectedMarker.surface= $scope.markerList[index].options.surface;
            $scope.selectedMarker.age= $scope.markerList[index].options.age;
            $scope.selectedMarker.facilities= $scope.markerList[index].options.facilities;
            $scope.selectedMarker.description= $scope.markerList[index].options.description;
            $scope.selectedMarker.images= $scope.markerList[index].options.images;
            $scope.selectedMarker.isEnclosed= $scope.markerList[index].options.isEnclosed;
            $scope.showSelectedMarker = true;
          }
      });
    };

		var promise = playgroundService.getPlaygrounds();
		promise.then(function(response){
			$.each(response.data, function(index){
				var marker = {
					id: response.data[index].id,
					options: {
						title: response.data[index].name,
						county: response.data[index].county,
            surface: response.data[index].surface,
            age: response.data[index].age,
            facilities: response.data[index].facilities,
						description: response.data[index].description,
            images: response.data[index].images,
            isEnclosed: response.data[index].isEnclosed
					},
					coords: {
						latitude: response.data[index].geoLat,
						longitude: response.data[index].geoLng,

					}
				};
				$scope.markerList.push(marker);
			});
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
