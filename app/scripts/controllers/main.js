'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
