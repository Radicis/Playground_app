'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('MainCtrl', function ($scope, authentication, $rootScope) {

    $rootScope.$on("login-done", function() {
      $rootScope.displayUsername = authentication.getUsername();
      $rootScope.userIsAdmin = authentication.isAdmin();
    });

    $scope.logout = function(){
      authentication.logout()
    };

    $scope.testSecurity = function(){
      authentication.createTest();
    }


  });


