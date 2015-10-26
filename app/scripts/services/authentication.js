'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.authentication
 * @description
 * # authentication
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
  .service('authentication', function ($cookies, $http, $rootScope, $q) {

    this.verifyToken =  function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://localhost/playground/rest/api/auth/auth?token=' + $cookies.get('myToken') + '&username=' + $cookies.get('username'),
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }).then(function (data) {
        deferred.resolve(data.data.message);
      });
      return deferred.promise;
    };

    this.login = function (username, password) {

        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
        });

        var loginString = 'username=' + (username) + '&password=' + (password);

        $http({
          method: 'PUT',
          url: 'http://localhost/playground/rest/api/auth/auth',
          data: loginString,
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
          console.log(data);
          $cookies.put('myToken', data.message);
          $cookies.put('username', username);
          //$location.path("/");
          console.log('Login Done!');
          $rootScope.$broadcast('login-done');
          return true;
        }).error(function (data) {
          console.log(data);
          return false;
        });
      };

    this.logout= function(){
        //using either token or username call the rest logout function and delete all cookies
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
        });
      };

    this.getUsername= function(){
        return  $cookies.get('username');
      };

    this.isAdmin = function(){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://localhost/playground/rest/api/auth/auth',
        data: 'token=' + $cookies.get('myToken'),
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }).then(function (data) {
        deferred.resolve(data.data.message);
      });
      return deferred.promise;
      };
  });
