'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('PlaygroundCtrl', function ($scope, $http) {

    $scope.markerList = [];
    $scope.mapCenter;

    $scope.selectedMarker = {
        title: "hello"
    };

    $scope.selectMarker= function(marker){
      $scope.selectedMarker.title= marker.m.options.title;
      $scope.selectedMarker.location= marker.m.options.location;
      $scope.selectedMarker.size= marker.m.options.size;
      $scope.$apply();
    };

    $http.get('http://localhost/playground/rest/api/playground/playgrounds/').success(function(response) {
      $.each(response, function(index){
        var marker = {
          id: Date.now(),
          options: {
            title: response[index].name,
            location: response[index].location,
            size: response[index].size
          },
          coords: {
            latitude: response[index].geoLat,
            longitude: response[index].geoLng
          },
          clickEvnt: function(){
            alert(response[index].name);
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

