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
      $scope.surfaces = ['Grass', 'Sand', 'Padded'];
      $scope.ages = ['1-3', '3-6', '6-12'];
      $scope.enclosedStatus = [{'value':0, 'name':'No'},{'value':1, 'name':'Yes'}];
      $scope.addPlayground = function() {
        var formData = {
          'name'  : $scope.playground.title,
          'county': $scope.playground.county,
          'geoLat'  : $scope.playground.geoLat,
          'geoLng': $scope.playground.geoLng,
          'description'  : $scope.playground.description,
          'isEnclosed': $scope.playground.isEnclosed,
          'facilities'  : $scope.playground.facilities,
          'images': $scope.playground.images,
          'surface' :$scope.playground.surface,
          'age'  : $scope.playground.age,
          'userID'  : $('input[name=userID]').val(),
        };

        var addPromise = playgroundService.addPlayground(formData);
        addPromise.then(function (repsonse) {
          $location.path('/');
        });
      }

      $scope.updatePlayground = function(){
        var formData = {
          'name'  : $scope.playground.title,
          'county': $scope.playground.county,
          'geoLat'  : $scope.playground.geoLat,
          'geoLng': $scope.playground.geoLng,
          'description'  : $scope.playground.description,
          'isEnclosed': $scope.playground.isEnclosed,
          'facilities'  : $scope.playground.facilities,
          'images': $scope.playground.images,
          'surface' :$scope.playground.surface,
          'age'  : $scope.playground.age,
          'id'  : $('input[name=pid]').val(),
        };

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
