'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
	.controller('PlaygroundViewCtrl', function ($scope, playgroundService, uiGmapGoogleMapApi, uiGmapIsReady, $routeParams, $cookies, $location) {

      $scope.userID = $cookies.get('userID');

      $scope.addPlayground = function() {
        var formData = {
          'name'  : $('input[name=name]').val(),
          'county': $('input[name=county]').val(),
          'geoLat'  : $('input[name=geoLat]').val(),
          'geoLng': $('input[name=geoLng]').val(),
          'description'  : $('input[name=description]').val(),
          'isEnclosed': 0,
          'facilities'  : $('input[name=facilities]').val(),
          'images': $('input[name=images]').val(),
          'surface'  : $('input[name=surface]').val(),
          'age'  : $('input[name=age]').val(),
          'userID'  : $('input[name=userID]').val(),
        };

        
        var addPromise = playgroundService.addPlayground(formData);
        addPromise.then(function (repsonse) {
          $location.path('/');
        });
      }

      $scope.updatePlayground = function(){
        var formData = {
          'name'  : $('input[name=name]').val(),
          'county': $('input[name=county]').val(),
          'geoLat'  : $('input[name=geoLat]').val(),
          'geoLng': $('input[name=geoLng]').val(),
          'description'  : $('input[name=description]').val(),
          'isEnclosed': 0,
          'facilities'  : $('input[name=facilities]').val(),
          'images': $('input[name=images]').val(),
          'surface'  : $('input[name=surface]').val(),
          'age'  : $('input[name=age]').val(),
          'id'  : $('input[name=pid]').val(),
        };

        console.log(formData.id);

        var addPromise = playgroundService.updatePlayground(formData);
        addPromise.then(function (repsonse) {
          $location.path('/');
        });
      }


      var viewPromise = playgroundService.getPlayground($routeParams.id);
      viewPromise.then(function (response) {
        $scope.playground = {};
        $scope.playground.title = response.data.name;
        $scope.playground.location = response.data.county;
        $scope.playground.county = response.data.county;
        $scope.playground.surface = response.data.surface;
        $scope.playground.age = response.data.age;
        $scope.playground.facilities = response.data.facilities;
        $scope.playground.description = response.data.description;
        $scope.playground.images = response.data.images;
        $scope.playground.isEnclosed = response.data.isEnclosed;
        $scope.playground.geoLat = response.data.geoLat;
        $scope.playground.geoLng = response.data.geoLng;
        $scope.playground.id = response.data.id;
      });
  });
