'use strict';

/**
 * @ngdoc directive
 * @name playgroundApp.directive:playgroundMap
 * @description
 * # playgroundMap
 */
angular.module('playgroundApp')
  .directive('playgroundMap', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/map.html',
      controller: 'playgroundCtrl'
    };
  });
