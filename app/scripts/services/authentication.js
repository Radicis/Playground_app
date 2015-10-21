'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.authentication
 * @description
 * # authentication
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
  .service('authentication', function ($cookies) {

    var loggedIn = $cookies.get('username');
    var isAdmin = $cookies.get('isAdmin');

    return {
      isLoggedIn: function(){
          return loggedIn;
      },
      isAdmin: function(){
        return isAdmin;
      }
    }

  });
