'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('AuthCtrl', function ($scope, $http, $cookies, $location) {
    $scope.postForm = function(){

      var encodedString = 'username=' + ($scope.inputData.username) + '&password=' + ($scope.inputData.password);

      $http({
        method: 'PUT',
        url:'http://localhost/playground/rest/api/auth/auth',
        data: encodedString,
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        console.log(data);
        $cookies.put('myToken', data['message']);
        $cookies.put('username', $scope.inputData.username);
        $location.path( "/" );
      }).error(function(data){
        console.log(data);
      })
    }

    $scope.testForm = function(){

      var username = $cookies.get('username');
      var token = $cookies.get('myToken');

      var encodedString = 'username=' + username + '&token=' + token;

      $http({
        method: 'DELETE',
        url:'http://localhost/playground/rest/api/playground/playgrounds/id/' + $scope.inputData.id,
        data: encodedString,
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        console.log(data);
      }).error(function(data){
        console.log(data);
      })
    }

    $scope.signup = function(isValid){

      if(isValid){
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
        });

        var encodedString = 'username=' + $scope.inputData.username + '&password=' + $scope.inputData.password + '&email=' + $scope.inputData.email;

        $http({
          method: 'PUT',
          url:'http://localhost/playground/rest/api/user/users',
          data: encodedString,
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).success(function(data){
          console.log(data);
          $location.path( "/login" );
        }).error(function(data){
          console.log(data);
        })
      }

    }
  });

var compareTo = function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
};

angular.module('playgroundApp').directive("compareTo", compareTo);
