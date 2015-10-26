'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.authentication
 * @description
 * # authentication
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
  .service('authentication', function ($cookies, $http, $rootScope) {

    var username;
    var isAdmin;



    return {
      login: function (username, password) {

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
          $cookies.put('myToken', data['message']);
          $cookies.put('username', username);
          //$location.path("/");
          console.log("Login Done!")
          $rootScope.$broadcast("login-done");
          return true;
        }).error(function (data) {
          console.log(data);
          return false;
        })
      },
      logout: function(){
        //using either token or username call the rest logout function and delete all cookies
        var cookies = $cookies.getAll();
        angular.forEach(cookies, function (v, k) {
          $cookies.remove(k);
        });
        $rootScope.$broadcast("login-done");
      },
      getUsername: function(){
        console.log("username: " + $cookies.get('username'));
        return  $cookies.get('username');
      },
      isLoggedIn: function(){
          return loggedIn;
      },
      isAdmin: function(){
        $http({
          method: 'POST',
          url: 'http://localhost/playground/rest/api/auth/auth',
          data: 'token=' + $cookies.get('myToken'),
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
          console.log(data);
          console.log("Checking if Admin..")
          if(data['message']==true){
            console.log("verified admin");
            return true;
          }
          console.log("Unable to verify admin");
          return false;
        }).error(function (data) {
          console.log(data);
          return false;
        })
      },
      verifyToken: function(){
        $http({
          method: 'GET',
          url: 'http://localhost/playground/rest/api/auth/auth?token=' + $cookies.get('myToken') + "&username=" + $cookies.get('username'),
          headers: {'Content-type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
          console.log(data);
          console.log("Verifying user token..")
          if(data['message']==true){
            console.log("verified token");
            return true;
          }
          console.log("Unable to verify token");
          /*var cookies = $cookies.getAll();
          angular.forEach(cookies, function (v, k) {
            $cookies.remove(k);
          });*/
          return false;
        }).error(function (data) {
          console.log(data);
          return false;
        })
      },
      createTest: function(){
        $cookies.put('myToken', 'invalidtoken');
        $cookies.put('username', 'root');
        $cookies.put('isAdmin', 'true');
      }
    }
  });
