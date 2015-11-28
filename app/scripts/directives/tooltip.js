'use strict';

/**
 * @ngdoc directive
 * @name playgroundApp.directive:toolip
 * @description
 * # tooltip
 */
angular.module('playgroundApp').directive('tooltip', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      $(element).hover(function(){
        // on mouseenter
        $(element).tooltip('show');
      }, function(){
        // on mouseleave
        $(element).tooltip('hide');
      });
    }
  };
});