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
    'uiGmapgoogle-maps',
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'PlaygroundCtrl',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        caseInsensitiveMatch: true,
        controller: 'AboutCtrl',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        caseInsensitiveMatch: true,
        controller: 'AuthCtrl',
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        caseInsensitiveMatch: true,
        controller: 'AuthCtrl',
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        caseInsensitiveMatch: true,
        controller: 'AdminCtrl',
        auth: true
      })
      .when('/loading', {
        templateUrl: 'views/loading.html',
        caseInsensitiveMatch: true,
        controller: 'LoadingCtrl',
       })
      .otherwise({
        redirectTo: '/'
      });

    //$locationProvider.html5Mode(true);
  }])
  .run(function(playgroundService, application, $rootScope, $location, authentication){
    playgroundService.getPlaygrounds().then(function(){
      application.makeReady();
    });

    //comes back undefined due to promise. Set listener
    var verifyPromise = authentication.verifyToken();
    verifyPromise.then(function(message){
      if(message) {
        var username = authentication.getUsername();
        if (username) {
          $rootScope.displayUsername = username;
          var adminPromise = authentication.isAdmin();
          adminPromise.then(function (isAdmin) {
               $rootScope.userIsAdmin = isAdmin;
          });
        }
      }
      else{
        $rootScope.displayUsername = null;
        $rootScope.userIsAdmin = false;
      }
    });

    $rootScope.$on('$locationChangeStart', function(scope, next, current){

      if($location.path() ==='/admin' && !$rootScope.userIsAdmin) {
        $location.path('login');
      }

     if ($location.path() === '/loading') {
        return;
      }
      if(!application.isReady()){
        $location.path('loading');
      }
    });
  });

angular.module('playgroundApp').config(function (uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: '',
    v: '3',
    libraries: ''
  });
});

/*
angular.module('playgroundApp').service('authInterceptor', function ($cookies) {
  return{
    request: function(config){
      config.headers = config.headers || {};
      if($cookies.get('myToken')){
        config.headers.token =  $cookies.get('myToken');
      }
      return config;
    }
  }
}).config(function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
});
*/

