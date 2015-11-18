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
    $http.get('http://localhost/playground/rest/api/playground/playgrounds').then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.getPlayground = function(id){
    var deferred = $q.defer();
    $http.get('http://localhost/playground/rest/api/playground/playgrounds/' + id).then(function(data){
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.deletePlayground = function(id){

    var deferred = $q.defer();
    $http({
      method: 'DELETE',
      data: 'username=root&token=aaa42296669b958c3cee6c0475c8093e',
      url: 'http://localhost/playground/rest/api/playground/playgrounds/id/' + id,
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.addPlayground = function(formData){

    var loginString = 'name=' + (formData.name) + '&county=' + (formData.county);
    loginString += '&geoLat=' + formData.geoLat;
    loginString += '&geoLng=' + formData.geoLng;
    loginString += '&description=' + formData.description;
    loginString += '&isEnclosed=' + formData.isEnclosed;
    loginString += '&facilities=' + formData.facilities;
    loginString += '&images=' + formData.images;
    loginString += '&surface=' + formData.surface;
    loginString += '&age=' + formData.age;

    loginString += '&username=root&token=aaa42296669b958c3cee6c0475c8093e';

    var deferred = $q.defer();
    $http({
      method: 'PUT',
      data: loginString,
      url: 'http://localhost/playground/rest/api/playground/playgrounds',
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };

  this.updatePlayground = function(formData){

    var id = formData.id;

    var loginString = 'name=' + (formData.name) + '&county=' + (formData.county);
    loginString += '&geoLat=' + formData.geoLat;
    loginString += '&geoLng=' + formData.geoLng;
    loginString += '&description=' + formData.description;
    loginString += '&isEnclosed=' + formData.isEnclosed;
    loginString += '&facilities=' + formData.facilities;
    loginString += '&images=' + formData.images;
    loginString += '&surface=' + formData.surface;
    loginString += '&age=' + formData.age;

    loginString += '&username=root&token=aaa42296669b958c3cee6c0475c8093e';

    var deferred = $q.defer();
    $http({
      method: 'POST',
      data: loginString,
      url: 'http://localhost/playground/rest/api/playground/playgrounds/' + id,
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    }).then(function(data) {
      deferred.resolve(data);
    });
    return deferred.promise;
  };



});


