'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:LoadingCtrl
 * @description
 * # LoadingCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('LoadingCtrl', function ($scope, application, $location) {
    application.registerListener(function(){
      $location.path('/');
    })
  });
