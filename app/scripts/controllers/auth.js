'use strict';

/**
 * @ngdoc function
 * @name playgroundApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the playgroundApp
 */
angular.module('playgroundApp')
  .controller('AuthCtrl', function ($scope, $http, $cookies, $location, authentication) {
    $scope.postForm = function(){

      var username = $scope.inputData.username;
      var password = $scope.inputData.password;

      authentication.login(username, password);

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
          url:'http://playground.betterfrog.com/rest/api/user/users',
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



/*

angular.module('playgroundApp')
  .factory('Auth', function($http, $q, AuthToken){
    var authFactory = {};

  authFactory.login = function(username, password){
    return $http.post('/api/login', {
      username: username,
      password: password
    })
      .success(function(data){
        AuthToken.setToken(data.token);
        return data;
      })
  }

    authFactory.logout = function(){
      AuthToken.setToken();
    }

    authFactory.isLoggedIn= function(){
      return AuthToken.getToken()
    }

    authFactory.getUser = function(){
      if(AuthToken.getToken()){
        return $http.get
      }
    }
});
*/


