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

    var promise = playgroundService.getPlaygrounds();
    promise.then(function(response){
      $.each(response.data, function(index){
          var playground = {};
        playground.id = response.data[index].id;
          playground.name = response.data[index].name;
          playground.location = response.data[index].location;
          playground.size = response.data[index].size;
          $scope.playgrounds.push(playground);
      })
    });

    $scope.deletePlayground = function(id){
      playgroundService.deletePlayground(id);
      //Delay on this. Use promise
      $location.path("/admin");
    }


  });
