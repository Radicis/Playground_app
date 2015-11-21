'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
  .controller('PlaygroundCtrl', function ($scope, playgroundService,weatherService, uiGmapGoogleMapApi, uiGmapIsReady, $routeParams, $cookies) {

    $scope.markers = [];
    $scope.allMarkers = [];

    $scope.selectedMarker = {};
    $scope.showSelectedMarker = false;

    $scope.filterForm = {};

    $scope.selectedMarker.reviews = [];
    $scope.travelMode = google.maps.TravelMode.DRIVING;
    $scope.directions = false;

    $scope.showRightControls = true;

    var defaultZoom = 8;

    var directionsService = new google.maps.DirectionsService(),
      directionsDisplay = new google.maps.DirectionsRenderer();

    $scope.setCenter = function(lat, lng){
      $scope.map.center.latitude = lat;
      $scope.map.center.longitude = lng;
      $scope.map.zoom = defaultZoom;
    };


    $scope.selectMarkerById = function (id) {
      directionsDisplay.setMap(null);
      $scope.selectedMarker.reviews = [];
      $scope.directions=false;
      if(document.getElementById("map-directions")){
        document.getElementById("map-directions").innerHTML = "";
      }
      $.each($scope.markers, function (index) {
        if ($scope.markers[index].id == id) {
          $scope.selectedMarker.reviews = [];
          $scope.selectedMarker.title = $scope.markers[index].options.title;
          $scope.selectedMarker.location = $scope.markers[index].options.location;
          $scope.selectedMarker.county = $scope.markers[index].options.county;
          $scope.selectedMarker.surface = $scope.markers[index].options.surface;
          $scope.selectedMarker.age = $scope.markers[index].options.age;
          $scope.selectedMarker.facilities = $scope.markers[index].options.facilities;
          $scope.selectedMarker.description = $scope.markers[index].options.description;
          $scope.selectedMarker.images = $scope.markers[index].options.images;
          $scope.selectedMarker.isEnclosed = $scope.markers[index].options.isEnclosed;
          $scope.selectedMarker.latitude = parseFloat($scope.markers[index].coords.latitude);
          $scope.selectedMarker.longitude = parseFloat($scope.markers[index].coords.longitude);
          $scope.selectedMarker.id = parseInt($scope.markers[index].id);
          $scope.selectedMarker.userID = parseInt($scope.markers[index].options.userID);
          $scope.showSelectedMarker = true;
          $scope.getReviews($scope.selectedMarker.id);
        }
      });
      $scope.setCenter($scope.selectedMarker.latitude,$scope.selectedMarker.longitude);

      $scope.showRightControls = true;
      // $scope.$apply();
    };

    $scope.getReviews = function(id){
      var reviewPromise = playgroundService.getReviews(id);
      var reviews = [];
      reviewPromise.then(function(response){
        $.each(response.data, function(index){
          reviews.push(response.data[index]);
        });
        $scope.selectedMarker.reviews =  reviews;
      })
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
            isEnclosed: response.data[index].isEnclosed,
            userID: response.data[index].userID
          },
          icon: {
            url: "images/icons/playground.png",
            size: new google.maps.Size(30,28),
            scaledSize: new google.maps.Size(30,28),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0,37/2)
          },
          coords: {
            latitude: response.data[index].geoLat,
            longitude: response.data[index].geoLng
          }
        };
        $scope.markers.push(marker);
        $scope.allMarkers.push(marker);
      });
      $scope.showMap = true;

      //Adds onclick event to all markers
      angular.forEach($scope.markers, function (value, key) {
        value.onClick = function () {
          $scope.selectMarkerById(value.id);
        };
      });

    });

      $scope.isCreator = function(id){
        if(id==$cookies.get('userID')){
          return true;
        }
      };

    $scope.viewPlayground = function(){
      if($scope.showView) {
        $scope.showView = false;
        $('.angular-google-map-container').removeClass('blur');
      }
      else{
        $scope.showView = true;
        $('.angular-google-map-container').addClass('blur');
      }
    };

    $scope.playgroundFilter = function(form){
      var searchTerm = form.searchFilter.$modelValue;
      var enclosed = form.enclosedFilter.$modelValue;
      var surface = form.surfaceFilter.$modelValue;

      $scope.filterPlaygrounds(searchTerm, enclosed, surface);
    };

      $scope.filterPlaygrounds = function(term, enclosed, surface, age){
        if(typeof term == 'undefined'){
          term = " ";
        }

        if(typeof surface == 'undefined'){
          surface = " ";
        }

        if(typeof age == 'undefined'){
          age = " ";
        }

        if(typeof enclosed == 'undefined'){
          enclosed = " ";
        }
        var filteredPlaygrounds = [];
        $scope.markers = $scope.allMarkers;
        $.each($scope.markers, function(index) {

          if(
              (((term.toUpperCase() == $scope.markers[index].options.county.toUpperCase()) || (term === " "))
                 || (($scope.markers[index].options.title.toUpperCase().indexOf(term.toUpperCase())>-1)))

                 && ((surface.toUpperCase() == $scope.markers[index].options.surface.toUpperCase()) || (surface === " "))
              && ((age.toUpperCase() == $scope.markers[index].options.age.toUpperCase()) || (age ===" "))
              && ((enclosed == $scope.markers[index].options.isEnclosed) || (enclosed === " "))
          )
          {
            filteredPlaygrounds.push($scope.markers[index]);
          }
        });

        if(filteredPlaygrounds.length==0){
          $scope.markers = $scope.allMarkers;
          alert("No matching playgrounds in database");
        }else{
          $scope.markers = filteredPlaygrounds;
        }
      };

      $scope.resetMap = function(){
        $scope.map.center.latitude = 53.41291;
        $scope.map.center.longitude = -8.24389;
        $scope.map.zoom = defaultZoom;
        $scope.markers = $scope.allMarkers;
      };



    $scope.toggleRight = function(){
      if($scope.showRightControls) {
        $scope.showRightControls = false;
      }
      else{
        $scope.showRightControls = true;
      }
    };



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
        bounds: {},
        markers: $scope.markers,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        events: {},
        control: {}
      },
      options : {
        styles: $scope.styleArray,
        scrollwheel: false,
        navigationControl: false,
        markers: {
          selected: {}
        },
        disableDefaultUI: true
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
          document.getElementById("map-directions").innerHTML = "";
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
