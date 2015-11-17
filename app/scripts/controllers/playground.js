'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
	.controller('PlaygroundCtrl', function ($scope, playgroundService,weatherService, uiGmapGoogleMapApi, uiGmapIsReady, $routeParams) {

    $scope.markerList = [];
    $scope.markers = [];

    $scope.selectedMarker = {};
    $scope.showSelectedMarker = false;
    $scope.travelMode = google.maps.TravelMode.DRIVING;
    $scope.directions = false;

    var directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer();

    $scope.setCenter = function(lat, lng){
      $scope.map.center.latitude = lat;
      $scope.map.center.longitude = lng;
    };

    $scope.selectMarker = function (marker) {
      directionsDisplay.setMap(null);
      $scope.directions=false;
      if(document.getElementById("map-directions")){
        document.getElementById("map-directions").innerHTML = "";
      }

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

      $scope.setCenter($scope.selectedMarker.latitude,$scope.selectedMarker.longitude);

      $scope.$apply();

    };

    $scope.selectMarkerById = function (id) {
      directionsDisplay.setMap(null);
      $scope.directions=false;
      if(document.getElementById("map-directions")){
        document.getElementById("map-directions").innerHTML = "";
      }
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
      $scope.setCenter($scope.selectedMarker.latitude,$scope.selectedMarker.longitude);
     // $scope.$apply();
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


    $scope.getWeather = function() {
      var weatherPromise = weatherService.getWeather($scope.selectedMarker.county);
      weatherPromise.then(function (response) {
        var forecast = response.data.query.results.channel.item.forecast;
        var weather = $('#weather');
        weather.html("");
        var html = "<h4>Weather</h4><ul class='weather'>";
        $.each(forecast, function(index){
          html += "<li class='weekday'><div>";
          html += forecast[index].day;
          html += "</div><div>";
          html += "<img src='images/weather/icon_" + forecast[index].code + ".png' /></div><div>";
          html += forecast[index].high;
          html += "</div></li>";
        });
        html += "</ul>";
        weather.html(html);
      });
    }


    $scope.styleArray= [
      {"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}
    ];



    angular.extend($scope, {
      map: {
        center: {
          latitude: 53.41291,
          longitude: -8.24389
        },
        zoom: 7,
        markers: $scope.markerList,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        events: {},
        control: {}
      },
      options : {
      styles: $scope.styleArray,
        scrollwheel: false,
        navigationControl: false,
    }
    });



    $scope.waitForLocation = function() {

      if (typeof $scope.initialLocation !== 'undefined') {
        var map = $scope.map.control.getGMap();    // get map object through $scope.map.control getGMap() function
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("map-directions"));
        var start = $scope.initialLocation;
        var end =  $scope.targetLocation;
        if(typeof $scope.travelMode==='undefined') {
          var travelMode = google.maps.TravelMode.DRIVING;
        }


        var travel = {
          origin: start,
          destination: end,
          travelMode: $scope.travelMode
        };
        directionsService.route(travel, function (result, status) {
          var dir = document.getElementById("map-directions").innerHTML = "";
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            $scope.directions=true;
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
