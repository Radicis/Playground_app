'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
	.controller('PlaygroundCtrl', function ($scope, playgroundService, uiGmapGoogleMapApi, uiGmapIsReady, $routeParams) {

    $scope.markerList = [];
    $scope.markers = [];

    $scope.selectedMarker = {};
    $scope.showSelectedMarker = false;
    $scope.travelMode = google.maps.TravelMode.DRIVING;

    var directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer();

    $scope.selectMarker = function (marker) {
      $scope.selectedMarker.title = marker.m.options.title;
      $scope.selectedMarker.location = marker.m.options.location;
      $scope.selectedMarker.county = marker.m.options.county;
      $scope.selectedMarker.surface = marker.m.options.surface;
      $scope.selectedMarker.age = marker.m.options.age;
      $scope.selectedMarker.facilities = marker.m.options.facilities;
      $scope.selectedMarker.description = marker.m.options.description;
      $scope.selectedMarker.images = marker.m.options.images;
      $scope.selectedMarker.isEnclosed = marker.m.options.isEnclosed;
      $scope.selectedMarker.latitude = parseFloat(marker.m.coords.latitude);
      $scope.selectedMarker.longitude = parseFloat(marker.m.coords.longitude);
      $scope.showSelectedMarker = true;
      $scope.selectedMarker.id = marker.m.id;
      $scope.$apply();
    };

    $scope.selectMarkerById = function (id) {
      $.each($scope.markerList, function (index) {
        if ($scope.markerList[index].id == id) {
          $scope.selectedMarker.title = $scope.markerList[index].options.title;
          $scope.selectedMarker.location = $scope.markerList[index].options.location;
          $scope.selectedMarker.county = $scope.markerList[index].options.county;
          $scope.selectedMarker.surface = $scope.markerList[index].options.surface;
          $scope.selectedMarker.age = $scope.markerList[index].options.age;
          $scope.selectedMarker.facilities = $scope.markerList[index].options.facilities;
          $scope.selectedMarker.description = $scope.markerList[index].options.description;
          $scope.selectedMarker.images = $scope.markerList[index].options.images;
          $scope.selectedMarker.isEnclosed = $scope.markerList[index].options.isEnclosed;
          $scope.selectedMarker.latitude = parseFloat($scope.markerList[index].coords.latitude);
          $scope.selectedMarker.longitude = parseFloat($scope.markerList[index].coords.longitude);
          $scope.selectedMarker.id = parseInt($scope.markerList[index].id);
          $scope.showSelectedMarker = true;
        }
      });
    };

    var promise = playgroundService.getPlaygrounds();
    promise.then(function (response) {
      $.each(response.data, function (index) {
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
            longitude: response.data[index].geoLng
          }
        };
        $scope.markerList.push(marker);
      });
      $scope.showMap = true;
    });



    angular.extend($scope, {
      map: {
        center: {
          latitude: 53.41291,
          longitude:-8.24389
        },
        zoom: 7,
        markers: $scope.markerList,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        events: {
        },
        control:{}
      }
    });

    $scope.waitForLocation = function() {

      if (typeof $scope.initialLocation !== 'undefined') {
        console.log("getting directions..");
        var map = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("map-directions"));
        var start = $scope.initialLocation;
        var end =  $scope.targetLocation;
        if(typeof $scope.travelMode==='undefined') {
          var travelMode = google.maps.TravelMode.DRIVING;
        }
        else{
          //console.log($scope.travelMode);
        }
        console.log($scope.travelMode);

        var travel = {
          origin: start,
          destination: end,
          travelMode: $scope.travelMode
        };
        directionsService.route(travel, function (result, status) {
          var dir = document.getElementById("map-directions").innerHTML = "";
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
        });
      }
      else {
        setTimeout(function () {
          $scope.waitForLocation();
        }, 100);
      }
    };

    $scope.setTravelMode = function(mode){
      console.log('Setting travel mode to ' + mode);
      switch(mode){
        case 'DRIVING': $scope.travelMode = google.maps.TravelMode.DRIVING; break;
        case 'WALKING': $scope.travelMode = google.maps.TravelMode.WALKING; break;
        case 'CYCLING': $scope.travelMode = google.maps.TravelMode.BICYCLING; break;
        case 'TRANSIT': $scope.travelMode = google.maps.TravelMode.TRANSIT; break;
        default: $scope.travelMode = google.maps.TravelMode.DRIVING; break;
      }
      $scope.getDirections();
    };


   $scope.getDirections = function(){
     if($scope.selectedMarker){
       if(!$scope.initialLocation) {
         $scope.getLocation();
         console.log("getting location..");
       }
       $scope.targetLocation = new google.maps.LatLng($scope.selectedMarker.latitude, $scope.selectedMarker.longitude);
       $scope.waitForLocation();
     }
    };

    $scope.getLocation = function(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          $scope.initialLocation =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        });
      }
      else{
        //If no location is gained from location sharing on client then set to default or spe
        $scope.initialLocation =  new google.maps.LatLng(51.896892, -8.486316);
      }
    }

  });
