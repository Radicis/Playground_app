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
      'angular-loading-bar'
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider) {


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
          .when('/contact', {
            templateUrl: 'views/contact.html',
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
            controller: 'AdminCtrl',
            auth: true
          })
          .when('/loading', {
            templateUrl: 'views/loading.html',
            caseInsensitiveMatch: true,
            controller: 'LoadingCtrl'
          })
          .when('/view/:id', {
            templateUrl: 'views/view.html',
            caseInsensitiveMatch: true,
            controller: 'PlaygroundViewCtrl'
          })
          .when('/edit/:id', {
            templateUrl: 'views/edit.html',
            caseInsensitiveMatch: true,
            controller: 'PlaygroundViewCtrl'
          })
          .when('/playground/add', {
            templateUrl: 'views/add.html',
            caseInsensitiveMatch: true,
            controller: 'PlaygroundViewCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });

      //$locationProvider.html5Mode(true);
    }])
    .run(function(playgroundService, application, $rootScope, $location, authentication) {

      var verifyPromise = authentication.verifyToken();
      verifyPromise.then(function(message) {
        if (message) {
          var username = authentication.getUsername();
          if (username) {
            $rootScope.displayUsername = username;
            $rootScope.userLoggedIn = true;
            var adminPromise = authentication.isAdmin();
            adminPromise.then(function(isAdmin) {
              $rootScope.userIsAdmin = isAdmin;
            });
          }
        } else {
          $rootScope.displayUsername = null;
          $rootScope.userIsAdmin = false;
          $rootScope.userLoggedIn = false;
        }
      });

      $rootScope.$on('$locationChangeStart', function(scope, next, current, $cookies) {

        if ($location.path() === '/admin' && !$rootScope.userIsAdmin) {
          $location.path('login');
        }

        if ($location.path() === '/playground/add' && !$rootScope.userLoggedIn) {
          $location.path('login');
        }

      });
    });

angular.module('playgroundApp').config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'XXXX',
    v: '3',
    libraries: 'weather,geometry,visualization'
  });
});

angular.module('playgroundApp')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = false;
      //cfpLoadingBarProvider.includeBar = false;
    }]);


angular.module('playgroundApp').config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
