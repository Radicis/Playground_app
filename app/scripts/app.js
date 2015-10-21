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
        caseInsensitiveMatch: true,
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        caseInsensitiveMatch: true,
        controller: 'AuthCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        caseInsensitiveMatch: true,
        controller: 'AuthCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        caseInsensitiveMatch: true,
        controller: 'AuthCtrl',

      })
      .when('/loading', {
        templateUrl: 'views/loading.html',
        caseInsensitiveMatch: true,
        controller: 'LoadingCtrl',

      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(playgroundService, application, $rootScope, $location){
    playgroundService.getPlaygrounds().then(function(){
      application.makeReady();
    });
    $rootScope.$on('$locationChangeStart', function(scope, next, current){

      if($location.path() === '/loading') return;

      if(!application.isReady()){
        $location.path('loading');
      }
    })
  });

angular.module('playgroundApp').config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: '',
    v: '3',
    libraries: 'weather,geometry,visualization'
  });
});

