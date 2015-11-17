"use strict";angular.module("playgroundApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","angular-loading-bar"]).config(["$routeProvider","$locationProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"PlaygroundCtrl"}).when("/about",{templateUrl:"views/about.html",caseInsensitiveMatch:!0,controller:"AboutCtrl"}).when("/login",{templateUrl:"views/login.html",caseInsensitiveMatch:!0,controller:"AuthCtrl"}).when("/signup",{templateUrl:"views/signup.html",caseInsensitiveMatch:!0,controller:"AuthCtrl"}).when("/admin",{templateUrl:"views/admin.html",caseInsensitiveMatch:!0,controller:"AdminCtrl",auth:!0}).when("/loading",{templateUrl:"views/loading.html",caseInsensitiveMatch:!0,controller:"LoadingCtrl"}).when("/view/:id",{templateUrl:"views/view.html",caseInsensitiveMatch:!0,controller:"PlaygroundViewCtrl"}).when("/edit/:id",{templateUrl:"views/edit.html",caseInsensitiveMatch:!0,controller:"PlaygroundViewCtrl"}).otherwise({redirectTo:"/"})}]).run(["playgroundService","application","$rootScope","$location","authentication",function(a,b,c,d,e){var f=e.verifyToken();f.then(function(a){if(a){var b=e.getUsername();if(b){c.displayUsername=b;var d=e.isAdmin();d.then(function(a){c.userIsAdmin=a})}}else c.displayUsername=null,c.userIsAdmin=!1}),c.$on("$locationChangeStart",function(a,b,e){"/admin"!==d.path()||c.userIsAdmin||d.path("login")})}]),angular.module("playgroundApp").config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyD169v2fy1ptsLoahXLOpN5zVZqRpKy3co",v:"3",libraries:"weather,geometry,visualization"})}]),angular.module("playgroundApp").config(["cfpLoadingBarProvider",function(a){a.includeSpinner=!1}]),angular.module("playgroundApp").service("playgroundService",["$rootScope","$http","$q",function(a,b,c){this.getPlaygrounds=function(){var a=c.defer();return b.get("http://playground.betterfrog.com/rest/api/playground/playgrounds").then(function(b){a.resolve(b)}),a.promise},this.getPlayground=function(a){var d=c.defer();return b.get("http://playground.betterfrog.com/rest/api/playground/playgrounds/"+a).then(function(a){d.resolve(a)}),d.promise},this.deletePlayground=function(a){var d=c.defer();return b({method:"DELETE",data:"username=root&token=aaa42296669b958c3cee6c0475c8093e",url:"http://playground.betterfrog.com/rest/api/playground/playgrounds/id/"+a,headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){d.resolve(a)}),d.promise}}]),angular.module("playgroundApp").controller("MainCtrl",["$scope","authentication","$rootScope",function(a,b,c){c.$on("login-done",function(){var a=b.verifyToken();a.then(function(a){if(a){var d=b.getUsername();if(d){c.displayUsername=d;var e=b.isAdmin();e.then(function(a){c.userIsAdmin=a})}}else c.displayUsername=null,c.userIsAdmin=!1})}),a.logout=function(){b.logout(),c.$broadcast("login-done")},a.testSecurity=function(){b.createTest()}}]),angular.module("playgroundApp").controller("AdminCtrl",["$scope","playgroundService","$location",function(a,b,c){a.playgrounds=[],a.getPlaygrounds=function(){a.playgrounds=[];var c=b.getPlaygrounds();c.then(function(b){$.each(b.data,function(c){var d={};d.id=b.data[c].id,d.name=b.data[c].name,d.location=b.data[c].location,d.size=b.data[c].size,a.playgrounds.push(d)})})},a.getPlaygrounds(),a.deletePlayground=function(c){var d=b.deletePlayground(c);d.then(function(b){a.getPlaygrounds()})}}]),angular.module("playgroundApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("playgroundApp").service("authentication",["$cookies","$http","$rootScope","$q","$location",function(a,b,c,d,e){this.verifyToken=function(){var c=d.defer();return b({method:"GET",url:"http://playground.betterfrog.com/rest/api/auth/auth?token="+a.get("myToken")+"&username="+a.get("username"),headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){c.resolve(a.data.message)}),c.promise},this.login=function(d,f){var g=a.getAll();angular.forEach(g,function(b,c){a.remove(c)});var h="username="+d+"&password="+f;b({method:"PUT",url:"http://playground.betterfrog.com/rest/api/auth/auth",data:h,headers:{"Content-type":"application/x-www-form-urlencoded"}}).success(function(b){return a.put("myToken",b.message),a.put("username",d),c.$broadcast("login-done"),e.path("/"),!0}).error(function(a){return!1})},this.logout=function(){var b=a.getAll();angular.forEach(b,function(b,c){a.remove(c)})},this.getUsername=function(){return a.get("username")},this.isAdmin=function(){var c=d.defer();return b({method:"POST",url:"http://playground.betterfrog.com/rest/api/auth/auth",data:"token="+a.get("myToken"),headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){c.resolve(a.data.message)}),c.promise}}]),angular.module("playgroundApp").controller("AuthCtrl",["$scope","$http","$cookies","$location","authentication",function(a,b,c,d,e){a.postForm=function(){var b=a.inputData.username,c=a.inputData.password;e.login(b,c)},a.signup=function(e){if(e){var f=c.getAll();angular.forEach(f,function(a,b){c.remove(b)});var g="username="+a.inputData.username+"&password="+a.inputData.password+"&email="+a.inputData.email;b({method:"PUT",url:"http://playground.betterfrog.com/rest/api/user/users",data:g,headers:{"Content-type":"application/x-www-form-urlencoded"}}).success(function(a){console.log(a),d.path("/login")}).error(function(a){console.log(a)})}}}]);var compareTo=function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(a,b,c,d){d.$validators.compareTo=function(b){return b==a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}};angular.module("playgroundApp").directive("compareTo",compareTo),angular.module("playgroundApp").controller("PlaygroundCtrl",["$scope","playgroundService","uiGmapGoogleMapApi","uiGmapIsReady","$routeParams",function(a,b,c,d,e){a.markerList=[],a.markers=[],a.selectedMarker={},a.showSelectedMarker=!1,a.travelMode=google.maps.TravelMode.DRIVING;var f=new google.maps.DirectionsService,g=new google.maps.DirectionsRenderer;a.selectMarker=function(b){a.selectedMarker.title=b.m.options.title,a.selectedMarker.location=b.m.options.location,a.selectedMarker.county=b.m.options.county,a.selectedMarker.surface=b.m.options.surface,a.selectedMarker.age=b.m.options.age,a.selectedMarker.facilities=b.m.options.facilities,a.selectedMarker.description=b.m.options.description,a.selectedMarker.images=b.m.options.images,a.selectedMarker.isEnclosed=b.m.options.isEnclosed,a.selectedMarker.latitude=parseFloat(b.m.coords.latitude),a.selectedMarker.longitude=parseFloat(b.m.coords.longitude),a.showSelectedMarker=!0,a.selectedMarker.id=b.m.id,a.$apply()},a.selectMarkerById=function(b){$.each(a.markerList,function(c){a.markerList[c].id==b&&(a.selectedMarker.title=a.markerList[c].options.title,a.selectedMarker.location=a.markerList[c].options.location,a.selectedMarker.county=a.markerList[c].options.county,a.selectedMarker.surface=a.markerList[c].options.surface,a.selectedMarker.age=a.markerList[c].options.age,a.selectedMarker.facilities=a.markerList[c].options.facilities,a.selectedMarker.description=a.markerList[c].options.description,a.selectedMarker.images=a.markerList[c].options.images,a.selectedMarker.isEnclosed=a.markerList[c].options.isEnclosed,a.selectedMarker.latitude=parseFloat(a.markerList[c].coords.latitude),a.selectedMarker.longitude=parseFloat(a.markerList[c].coords.longitude),a.selectedMarker.id=parseInt(a.markerList[c].id),a.showSelectedMarker=!0)})};var h=b.getPlaygrounds();h.then(function(b){$.each(b.data,function(c){var d={id:b.data[c].id,options:{title:b.data[c].name,county:b.data[c].county,surface:b.data[c].surface,age:b.data[c].age,facilities:b.data[c].facilities,description:b.data[c].description,images:b.data[c].images,isEnclosed:b.data[c].isEnclosed},coords:{latitude:b.data[c].geoLat,longitude:b.data[c].geoLng}};a.markerList.push(d)}),a.showMap=!0}),angular.extend(a,{map:{center:{latitude:53.41291,longitude:-8.24389},zoom:7,markers:a.markerList,mapTypeId:google.maps.MapTypeId.ROADMAP,events:{},control:{}}}),a.waitForLocation=function(){if("undefined"!=typeof a.initialLocation){console.log("getting directions..");var b=a.map.control.getGMap();g.setMap(b),g.setPanel(document.getElementById("map-directions"));var c=a.initialLocation,d=a.targetLocation;if("undefined"==typeof a.travelMode){google.maps.TravelMode.DRIVING}console.log(a.travelMode);var e={origin:c,destination:d,travelMode:a.travelMode};f.route(e,function(a,b){document.getElementById("map-directions").innerHTML="";b===google.maps.DirectionsStatus.OK&&g.setDirections(a)})}else setTimeout(function(){a.waitForLocation()},100)},a.setTravelMode=function(b){switch(console.log("Setting travel mode to "+b),b){case"DRIVING":a.travelMode=google.maps.TravelMode.DRIVING;break;case"WALKING":a.travelMode=google.maps.TravelMode.WALKING;break;case"CYCLING":a.travelMode=google.maps.TravelMode.BICYCLING;break;case"TRANSIT":a.travelMode=google.maps.TravelMode.TRANSIT;break;default:a.travelMode=google.maps.TravelMode.DRIVING}a.getDirections()},a.getDirections=function(){a.selectedMarker&&(a.initialLocation||(a.getLocation(),console.log("getting location..")),a.targetLocation=new google.maps.LatLng(a.selectedMarker.latitude,a.selectedMarker.longitude),a.waitForLocation())},a.getLocation=function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){a.initialLocation=new google.maps.LatLng(b.coords.latitude,b.coords.longitude)}):a.initialLocation=new google.maps.LatLng(51.896892,-8.486316)}}]),angular.module("playgroundApp").controller("PlaygroundViewCtrl",["$scope","playgroundService","uiGmapGoogleMapApi","uiGmapIsReady","$routeParams",function(a,b,c,d,e){var f=b.getPlayground(e.id);f.then(function(b){a.playground={},a.playground.title=b.data.name,a.playground.location=b.data.county,a.playground.county=b.data.county,a.playground.surface=b.data.surface,a.playground.age=b.data.age,a.playground.facilities=b.data.facilities,a.playground.description=b.data.description,a.playground.images=b.data.images,a.playground.isEnclosed=b.data.isEnclosed,a.playground.latitude=b.data.latitude,a.playground.longitude=b.data.longitude,a.playground.id=b.data.id})}]),angular.module("playgroundApp").directive("playgroundMap",function(){return{restrict:"E",templateUrl:"views/map.html",controller:"playgroundCtrl"}}),angular.module("playgroundApp").controller("LoadingCtrl",["$scope","application","$location",function(a,b,c){b.registerListener(function(){c.path("/")})}]),angular.module("playgroundApp").service("application",function(){var a=!1,b=[],c=function(){$.each(b,function(a){b[a]()})};return{isReady:function(){return a},makeReady:function(){a=!0,c()},unReady:function(){a=!1,c()},registerListener:function(c){a?c():b.push(c)}}});