'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:PlaygroundCtrl
 * @description
 * # PlaygroundCtrl
 * Controller of the playgroundApp
 */

angular.module('playgroundApp')
	.controller('PlaygroundViewCtrl', function ($scope, playgroundService, uiGmapGoogleMapApi, uiGmapIsReady, $routeParams) {


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
        $scope.playground.latitude = response.data.latitude;
        $scope.playground.longitude = response.data.longitude;
        $scope.playground.id = response.data.id;
      });
  });
