'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.playground
 * @description
 * # playground
 * Service in the playgroundApp.
 */
angular.module('playgroundApp').service('playgroundService', function($rootScope, $http, $q){

  this.getPlaygrounds = function(){
    var deferred = $q.defer();
    $http.get('http://playground.betterfrog.com/rest/api/playground/playgrounds').then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.getPlayground = function(id){
    var deferred = $q.defer();
    $http.get('http://playground.betterfrog.com/rest/api/playground/playgrounds/' + id).then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.deletePlayground = function(id){

    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      data: 'username=root&token=aaa42296669b958c3cee6c0475c8093e',
      url: 'http://playground.betterfrog.com/rest/api/playground/playgrounds/id/' + id,
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };



});


