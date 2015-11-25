'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('AdminCtrl', function ($scope, playgroundService, $location) {

    //Check if admin before getting here on this route

    //User playground service to pull objects

    $scope.playgrounds = [];

    $scope.getPlaygrounds = function() {
      $scope.playgrounds = [];
      var promise = playgroundService.getPlaygrounds();
      promise.then(function (response) {
        $.each(response.data, function (index) {
          var playground = {};
          playground.id = response.data[index].id;
          playground.name = response.data[index].name;
          playground.county = response.data[index].county;
          playground.surface = response.data[index].surface;
          $scope.playgrounds.push(playground);
        })
      });
    }

    $scope.getPlaygrounds();

    $scope.deletePlayground = function(id) {
      var delPromise = playgroundService.deletePlayground(id);

      delPromise.then(function (response) {
        $scope.getPlaygrounds();
      });
    }
  });
