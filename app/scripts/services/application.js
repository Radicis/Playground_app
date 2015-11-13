'use strict';

/**
 * @ngdoc service
 * @name playgroundApp.application
 * @description
 * # application
 * Service in the playgroundApp.
 */
angular.module('playgroundApp')
  .service('application', function Application() {

    var ready = false, registeredListeners = [];

    var callListeners = function(){
      $.each(registeredListeners, function(index){
        registeredListeners[index]();
      });
    };

    return {
      isReady:function(){
        return ready;
      },
      makeReady:function(){
        ready=true;
        callListeners();
      },
      unReady:function(){
        ready=false;
        callListeners();
      },
      registerListener:function(callback){
        if(ready) callback();
        else registeredListeners.push(callback);
      }
    };
  });
