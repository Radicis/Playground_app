'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
