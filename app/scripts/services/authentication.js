'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.authentication
 * @description authenticates the user with the REST api
 * # authentication
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
  .service('authentication', function ($cookies, $http, $rootScope, $q, $location) {


	this.verifyToken =  function() {
	  var deferred = $q.defer();
	  $http({
		method: 'GET',
		url: 'http://playground.betterfrog.com/rest/api/auth/auth/token/' + $cookies.get('myToken') + '/username/' + $cookies.get('username'),
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
		  url: 'http://playground.betterfrog.com/rest/api/auth/auth',
		  data: loginString,
		  headers: {'Content-type': 'application/x-www-form-urlencoded'}
		}).success(function (data) {
		  $cookies.put('myToken', data.token);
		  $cookies.put('username', username);
		  $cookies.put('userID', data.userID);
		  $rootScope.$broadcast('login-done');
		  $location.path('/');
		  return true;
		}).error(function (data) {
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
		url: 'http://playground.betterfrog.com/rest/api/auth/auth/',
		data: 'token=' + $cookies.get('myToken'),
		headers: {'Content-type': 'application/x-www-form-urlencoded'}
	  }).then(function (data) {
		deferred.resolve(data.data.message);
	  });
	  return deferred.promise;
	  };

		this.getUsers = function(){
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'http://playground.betterfrog.com/rest/api/user/users/username/' + $cookies.get('username') + '/token/' + $cookies.get('myToken'),
				data: {},
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).then(function (data) {
				deferred.resolve(data.data);
			});
			return deferred.promise;
		};

		this.deleteUser = function(id){
			var deferred = $q.defer();
			$http({
				method: 'DELETE',
				url: 'http://playground.betterfrog.com/rest/api/user/users/id/' + id,
				data: 'username=' + $cookies.get('username') + '&token=' + $cookies.get('myToken'),
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).then(function (data) {
				deferred.resolve(data.data);
			});
			return deferred.promise;
		};

  });
