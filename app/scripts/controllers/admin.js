'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
    .controller('AdminCtrl', function($scope, playgroundService, $location, authentication) {

      $scope.showUsers = false;
      $scope.showPlaygrounds = true;

      $scope.switchView = function() {
        if ($scope.showUsers == false) {
          $scope.showUsers = true;
          $scope.showPlaygrounds = false;
        } else {
          $scope.showPlaygrounds = true;
          $scope.showUsers = false;
        }

      };

      $scope.playgrounds = [];

      $scope.getPlaygrounds = function() {
        $scope.playgrounds = [];
        var promise = playgroundService.getPlaygrounds();
        promise.then(function(response) {
          $.each(response.data, function(index) {
            var playground = {};
            playground.id = response.data[index].id;
            playground.name = response.data[index].name;
            playground.county = response.data[index].county;
            playground.surface = response.data[index].surface;
            $scope.playgrounds.push(playground);
          })
        });
      };

      $scope.getUsers = function() {
        $scope.users = [];
        var userPromise = authentication.getUsers();
        userPromise.then(function(response) {
          $.each(response, function(index) {
            var user = {};
            user.id = response[index].id;
            user.username = response[index].username;
            user.email = response[index].email;
            $scope.users.push(user);
          })
        });
      }

      $scope.deleteUser = function(id) {
        var delUserPromise = authentication.deleteUser(id);
        delUserPromise.then(function(response) {
          $scope.getUsers();
        });
      }

      $scope.getPlaygrounds();
      $scope.getUsers();

      $scope.deletePlayground = function(id) {
        var delPromise = playgroundService.deletePlayground(id);
        delPromise.then(function(response) {
          $scope.getPlaygrounds();
        });
      }
    });