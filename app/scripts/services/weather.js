'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.weather
 * @description Queries the Yahoo Weather API using YQL format to get 5 day forecast
 * # weather
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
    .service('weatherService', function($http, $q) {

      this.baseYahooURL = 'https://query.yahooapis.com/v1/public/yql?q=';

      this.getWeather = function(city) {
        var deferred = $q.defer();
        var woeidYQL = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + ", IRE')and u='c'&format=json";
        var jsonURL = this.baseYahooURL + woeidYQL;

        $http.get(jsonURL).then(function(data) {
          deferred.resolve(data);
        });
        return deferred.promise;
      };
    });