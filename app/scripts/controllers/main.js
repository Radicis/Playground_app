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
      var verifyPromise = authentication.verifyToken();
      verifyPromise.then(function(message){
        if(message) {
          var username = authentication.getUsername();
          if (username) {
            $rootScope.displayUsername = username;
            var adminPromise = authentication.isAdmin();
            adminPromise.then(function (isAdmin) {
              $rootScope.userIsAdmin = isAdmin;
            })
          }
        }
        else{
          $rootScope.displayUsername = null;
          $rootScope.userIsAdmin = false;
        }
      });
    });

    $scope.logout = function(){
      authentication.logout();
      $rootScope.$broadcast("login-done");
    };

    $scope.testSecurity = function(){
      authentication.createTest();
    }


  });


