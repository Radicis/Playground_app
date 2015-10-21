'use strict';

/**
 * @ngdoc overview
 * @name playgroundApp
 * @description
 * # playgroundApp
 *
 * Main module of the application.
 */
angular
  .module('playgroundApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PlaygroundCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('playgroundApp').config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: '',
    v: '3',
    libraries: 'weather,geometry,visualization'
  });
});

