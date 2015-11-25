"use strict";angular.module("playgroundApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","angular-loading-bar"]).config(["$routeProvider","$locationProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"PlaygroundCtrl"}).when("/about",{templateUrl:"views/about.html",caseInsensitiveMatch:!0,controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",caseInsensitiveMatch:!0,controller:"AboutCtrl"}).when("/login",{templateUrl:"views/login.html",caseInsensitiveMatch:!0,controller:"AuthCtrl"}).when("/signup",{templateUrl:"views/signup.html",caseInsensitiveMatch:!0,controller:"AuthCtrl"}).when("/admin",{templateUrl:"views/admin.html",caseInsensitiveMatch:!0,controller:"AdminCtrl",auth:!0}).when("/loading",{templateUrl:"views/loading.html",caseInsensitiveMatch:!0,controller:"LoadingCtrl"}).when("/view/:id",{templateUrl:"views/view.html",caseInsensitiveMatch:!0,controller:"PlaygroundViewCtrl"}).when("/edit/:id",{templateUrl:"views/edit.html",caseInsensitiveMatch:!0,controller:"PlaygroundViewCtrl"}).when("/playground/add",{templateUrl:"views/add.html",caseInsensitiveMatch:!0,controller:"PlaygroundViewCtrl"}).otherwise({redirectTo:"/"})}]).run(["playgroundService","application","$rootScope","$location","authentication",function(a,b,c,d,e){var f=e.verifyToken();f.then(function(a){if(a){var b=e.getUsername();if(b){c.displayUsername=b,c.userLoggedIn=!0;var d=e.isAdmin();d.then(function(a){c.userIsAdmin=a})}}else c.displayUsername=null,c.userIsAdmin=!1,c.userLoggedIn=!1}),c.$on("$locationChangeStart",function(a,b,e,f){"/admin"!==d.path()||c.userIsAdmin||d.path("login"),"/edit/:id"!==d.path()||c.userLoggedIn||d.path("login")})}]),angular.module("playgroundApp").config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyD169v2fy1ptsLoahXLOpN5zVZqRpKy3co",v:"3",libraries:"weather,geometry,visualization"})}]),angular.module("playgroundApp").config(["cfpLoadingBarProvider",function(a){a.includeSpinner=!1}]),angular.module("playgroundApp").config(["$httpProvider",function(a){a.defaults.useXDomain=!0,delete a.defaults.headers.common["X-Requested-With"]}]),angular.module("playgroundApp").service("playgroundService",["$rootScope","$http","$q",function(a,b,c){this.getPlaygrounds=function(){var a=c.defer();return b.get("http://playground.betterfrog.com/rest/api/playground/playgrounds").then(function(b){a.resolve(b)}),a.promise},this.getPlayground=function(a){var d=c.defer();return b.get("http://playground.betterfrog.com/rest/api/playground/playgrounds/"+a).then(function(a){d.resolve(a)}),d.promise},this.deletePlayground=function(a){var d=c.defer();return b({method:"DELETE",data:"username=root&token=aaa42296669b958c3cee6c0475c8093e",url:"http://playground.betterfrog.com/rest/api/playground/playgrounds/id/"+a,headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){d.resolve(a)}),d.promise},this.addPlayground=function(a){var d="name="+a.name+"&county="+a.county;d+="&geoLat="+a.geoLat,d+="&geoLng="+a.geoLng,d+="&description="+a.description,d+="&isEnclosed="+a.isEnclosed,d+="&facilities="+a.facilities,d+="&images="+a.images,d+="&surface="+a.surface,d+="&age="+a.age,d+="&userID="+a.userID,d+="&username=root&token=aaa42296669b958c3cee6c0475c8093e";var e=c.defer();return b({method:"PUT",data:d,url:"http://playground.betterfrog.com/rest/api/playground/playgrounds",headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){e.resolve(a)}),e.promise},this.updatePlayground=function(a){var d=a.id,e="name="+a.name+"&county="+a.county;e+="&geoLat="+a.geoLat,e+="&geoLng="+a.geoLng,e+="&description="+a.description,e+="&isEnclosed="+a.isEnclosed,e+="&facilities="+a.facilities,e+="&images="+a.images,e+="&surface="+a.surface,e+="&age="+a.age,e+="&username=root&token=aaa42296669b958c3cee6c0475c8093e";var f=c.defer();return b({method:"POST",data:e,url:"http://playground.betterfrog.com/rest/api/playground/playgrounds/"+d,headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){f.resolve(a)}),f.promise},this.getReviews=function(a){var d=c.defer();return b({method:"GET",data:{},url:"http://playground.betterfrog.com/rest/api/review/reviews/id/"+a,headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){d.resolve(a)}),d.promise}}]),angular.module("playgroundApp").controller("MainCtrl",["$scope","authentication","$rootScope",function(a,b,c){c.$on("login-done",function(){var a=b.verifyToken();a.then(function(a){if(a){var d=b.getUsername();if(d){c.displayUsername=d;var e=b.isAdmin();e.then(function(a){c.userIsAdmin=a})}}else c.displayUsername=null,c.userIsAdmin=!1})}),a.logout=function(){b.logout(),c.$broadcast("login-done")},a.testSecurity=function(){b.createTest()}}]),angular.module("playgroundApp").controller("AdminCtrl",["$scope","playgroundService","$location",function(a,b,c){a.playgrounds=[],a.getPlaygrounds=function(){a.playgrounds=[];var c=b.getPlaygrounds();c.then(function(b){$.each(b.data,function(c){var d={};d.id=b.data[c].id,d.name=b.data[c].name,d.county=b.data[c].county,d.surface=b.data[c].surface,a.playgrounds.push(d)})})},a.getPlaygrounds(),a.deletePlayground=function(c){var d=b.deletePlayground(c);d.then(function(b){a.getPlaygrounds()})}}]),angular.module("playgroundApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("playgroundApp").service("authentication",["$cookies","$http","$rootScope","$q","$location",function(a,b,c,d,e){this.verifyToken=function(){var c=d.defer();return b({method:"GET",url:"http://playground.betterfrog.com/rest/api/auth/auth/token/"+a.get("myToken")+"/username/"+a.get("username"),headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){c.resolve(a.data.message)}),c.promise},this.login=function(d,f){var g=a.getAll();angular.forEach(g,function(b,c){a.remove(c)});var h="username="+d+"&password="+f;b({method:"PUT",url:"http://playground.betterfrog.com/rest/api/auth/auth",data:h,headers:{"Content-type":"application/x-www-form-urlencoded"}}).success(function(b){return a.put("myToken",b.token),a.put("username",d),a.put("userID",b.userID),c.$broadcast("login-done"),e.path("/"),!0}).error(function(a){return!1})},this.logout=function(){var b=a.getAll();angular.forEach(b,function(b,c){a.remove(c)})},this.getUsername=function(){return a.get("username")},this.isAdmin=function(){var c=d.defer();return b({method:"POST",url:"http://playground.betterfrog.com/rest/api/auth/auth/",data:"token="+a.get("myToken"),headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(a){c.resolve(a.data.message)}),c.promise}}]),angular.module("playgroundApp").controller("AuthCtrl",["$scope","$http","$cookies","$location","authentication",function(a,b,c,d,e){a.postForm=function(){var b=a.inputData.username,c=a.inputData.password;e.login(b,c)},a.signup=function(e){if(e){var f=c.getAll();angular.forEach(f,function(a,b){c.remove(b)});var g="username="+a.inputData.username+"&password="+a.inputData.password+"&email="+a.inputData.email;b({method:"PUT",url:"http://playground.betterfrog.com/rest/api/user/users",data:g,headers:{"Content-type":"application/x-www-form-urlencoded"}}).success(function(a){console.log(a),d.path("/login")}).error(function(a){console.log(a)})}}}]);var compareTo=function(){return{require:"ngModel",scope:{otherModelValue:"=compareTo"},link:function(a,b,c,d){d.$validators.compareTo=function(b){return b==a.otherModelValue},a.$watch("otherModelValue",function(){d.$validate()})}}};angular.module("playgroundApp").directive("compareTo",compareTo),angular.module("playgroundApp").controller("PlaygroundCtrl",["$rootScope","$scope","playgroundService","weatherService","uiGmapGoogleMapApi","uiGmapIsReady","$routeParams","$cookies",function(a,b,c,d,e,f,g,h){b.markers=[],b.allMarkers=[],b.selectedMarker={},b.showSelectedMarker=!1,b.filterForm={},b.selectedMarker.reviews=[],b.travelMode=google.maps.TravelMode.DRIVING,b.directions=!1,b.showRightControls=!0,b.showLeftControls=!0;var i=8,j=new google.maps.DirectionsService,k=new google.maps.DirectionsRenderer;b.setCenter=function(a,c){b.map.center.latitude=a,b.map.center.longitude=c,b.map.zoom=12},b.selectMarkerById=function(a){k.setMap(null),b.selectedMarker.reviews=[],b.directions=!1,document.getElementById("map-directions")&&(document.getElementById("map-directions").innerHTML=""),$.each(b.markers,function(c){b.markers[c].id==a&&(b.selectedMarker.reviews=[],b.selectedMarker.title=b.markers[c].options.title,b.selectedMarker.location=b.markers[c].options.location,b.selectedMarker.county=b.markers[c].options.county,b.selectedMarker.surface=b.markers[c].options.surface,b.selectedMarker.age=b.markers[c].options.age,b.selectedMarker.facilities=b.markers[c].options.facilities,b.selectedMarker.description=b.markers[c].options.description,b.selectedMarker.images=b.markers[c].options.images,b.selectedMarker.isEnclosed=b.markers[c].options.isEnclosed,b.selectedMarker.latitude=parseFloat(b.markers[c].coords.latitude),b.selectedMarker.longitude=parseFloat(b.markers[c].coords.longitude),b.selectedMarker.id=parseInt(b.markers[c].id),b.selectedMarker.userID=parseInt(b.markers[c].options.userID),b.showSelectedMarker=!0,b.getReviews(b.selectedMarker.id))}),b.setCenter(b.selectedMarker.latitude,b.selectedMarker.longitude),b.showRightControls=!0;var c=$("#playground_"+b.selectedMarker.id).position().top;$("#playgrounds").animate({scrollTop:c},"slow")},b.getReviews=function(a){var d=c.getReviews(a),e=[];d.then(function(a){$.each(a.data,function(b){e.push(a.data[b])}),b.selectedMarker.reviews=e})};var l=c.getPlaygrounds();l.then(function(a){$.each(a.data,function(c){var d={id:a.data[c].id,options:{title:a.data[c].name,county:a.data[c].county,surface:a.data[c].surface,age:a.data[c].age,facilities:a.data[c].facilities,description:a.data[c].description,images:a.data[c].images,isEnclosed:a.data[c].isEnclosed,userID:a.data[c].userID},icon:{url:"images/icons/playground.png",size:new google.maps.Size(30,28),scaledSize:new google.maps.Size(30,28),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,18.5)},coords:{latitude:a.data[c].geoLat,longitude:a.data[c].geoLng}};b.markers.push(d),b.allMarkers.push(d)}),b.showMap=!0,angular.forEach(b.markers,function(a,c){a.onClick=function(){b.selectMarkerById(a.id)}})}),b.isCreator=function(b){return b==h.get("userID")||a.userIsAdmin?!0:void 0},b.viewPlayground=function(){b.showView?(b.showView=!1,$(".angular-google-map-container").removeClass("blur")):(b.showView=!0,$(".angular-google-map-container").addClass("blur"))},b.playgroundFilter=function(a){var c=a.searchFilter.$modelValue,d=a.enclosedFilter.$modelValue,e=a.surfaceFilter.$modelValue;b.filterPlaygrounds(c,d,e)},b.filterPlaygrounds=function(a,c,d,e){"undefined"==typeof a&&(a=" "),"undefined"==typeof d&&(d=" "),"undefined"==typeof e&&(e=" "),"undefined"==typeof c&&(c=" ");var f=[];b.markers=b.allMarkers,$.each(b.markers,function(g){!(a.toUpperCase()==b.markers[g].options.county.toUpperCase()||" "===a||b.markers[g].options.title.toUpperCase().indexOf(a.toUpperCase())>-1)||d.toUpperCase()!=b.markers[g].options.surface.toUpperCase()&&" "!==d||e.toUpperCase()!=b.markers[g].options.age.toUpperCase()&&" "!==e||c!=b.markers[g].options.isEnclosed&&" "!==c||f.push(b.markers[g])}),0==f.length?(b.markers=b.allMarkers,alert("No matching playgrounds in database")):b.markers=f},b.resetMap=function(){b.map.center.latitude=53.41291,b.map.center.longitude=-8.24389,b.map.zoom=i,b.markers=b.allMarkers},b.toggleRight=function(){b.showRightControls?(b.showRightControls=!1,$("#right-controls").slideUp(),$("#close-icon").removeClass("glyphicon-minus"),$("#close-icon").addClass("glyphicon-plus")):(b.showRightControls=!0,$("#right-controls").slideDown(),$("#close-icon").removeClass("glyphicon-plus"),$("#close-icon").addClass("glyphicon-minus"))},b.toggleLeft=function(){b.showLeftControls?(b.showLeftControls=!1,$("#filterForm").slideUp(),$("#close-icon-left").removeClass("glyphicon-minus"),$("#close-icon-left").addClass("glyphicon-plus")):(b.showLeftControls=!0,$("#filterForm").slideDown(),$("#close-icon-left").removeClass("glyphicon-plus"),$("#close-icon-left").addClass("glyphicon-minus"))},b.getWeather=function(){var a=d.getWeather(b.selectedMarker.county);a.then(function(a){var b=a.data.query.results.channel.item.forecast,c=$("#weather");c.html("");var d="<ul class='weather'>";$.each(b,function(a){d+="<li class='weekday'><div>",d+=b[a].day,d+="</div><div>",d+="<img src='images/weather/icon_"+b[a].code+".png' /></div><div>",d+=b[a].high+"&deg;c",d+="</div></li>"}),d+="</ul>",c.html(d)})},b.styleArray=[{featureType:"water",elementType:"geometry",stylers:[{visibility:"on"},{color:"#aee2e0"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#abce83"}]},{featureType:"poi",elementType:"geometry.fill",stylers:[{color:"#769E72"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#7B8758"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#EBF4A4"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{visibility:"simplified"},{color:"#8dab68"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#5B5B3F"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#ABCE83"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#A4C67D"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#9BBF72"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#EBF4A4"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"},{color:"#87ae79"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#7f2200"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"#ffffff"},{visibility:"on"},{weight:4.1}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#495421"}]},{featureType:"administrative.neighborhood",elementType:"labels",stylers:[{visibility:"off"}]}],angular.extend(b,{map:{center:{latitude:53.41291,longitude:-8.24389},zoom:7,bounds:{},markers:b.markers,mapTypeId:google.maps.MapTypeId.ROADMAP,events:{},control:{}},options:{styles:b.styleArray,disableDefaultUI:!0,scrollwheel:!1,markers:{selected:{}}}}),b.zoomIn=function(){b.map.zoom=b.map.zoom+1},b.zoomOut=function(){b.map.zoom=b.map.zoom-1},b.waitForLocation=function(){if("undefined"!=typeof b.initialLocation){var a=b.map.control.getGMap();k.setMap(a),k.setPanel(document.getElementById("map-directions"));var c=b.initialLocation,d=b.targetLocation;if("undefined"==typeof b.travelMode){google.maps.TravelMode.DRIVING}var e={origin:c,destination:d,travelMode:b.travelMode};j.route(e,function(a,c){document.getElementById("map-directions").innerHTML="",c===google.maps.DirectionsStatus.OK&&(k.setDirections(a),b.directions=!0)})}else setTimeout(function(){b.waitForLocation()},100)},b.setTravelMode=function(a){switch(console.log("Setting travel mode to "+a),a){case"DRIVING":b.travelMode=google.maps.TravelMode.DRIVING;break;case"WALKING":b.travelMode=google.maps.TravelMode.WALKING;break;case"CYCLING":b.travelMode=google.maps.TravelMode.BICYCLING;break;case"TRANSIT":b.travelMode=google.maps.TravelMode.TRANSIT;break;default:b.travelMode=google.maps.TravelMode.DRIVING}b.getDirections()},b.getDirections=function(){b.selectedMarker&&(b.initialLocation||b.getLocation(),b.targetLocation=new google.maps.LatLng(b.selectedMarker.latitude,b.selectedMarker.longitude),b.waitForLocation())},b.getLocation=function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){b.initialLocation=new google.maps.LatLng(a.coords.latitude,a.coords.longitude)}):b.initialLocation=new google.maps.LatLng(51.896892,-8.486316)}}]),angular.module("playgroundApp").controller("PlaygroundViewCtrl",["$scope","playgroundService","uiGmapGoogleMapApi","uiGmapIsReady","$routeParams","$cookies","$location",function(a,b,c,d,e,f,g){a.userID=f.get("userID"),a.addPlayground=function(){var a={name:$("input[name=name]").val(),county:$("input[name=county]").val(),geoLat:$("input[name=geoLat]").val(),geoLng:$("input[name=geoLng]").val(),description:$("input[name=description]").val(),isEnclosed:0,facilities:$("input[name=facilities]").val(),images:$("input[name=images]").val(),surface:$("input[name=surface]").val(),age:$("input[name=age]").val(),userID:$("input[name=userID]").val()},c=b.addPlayground(a);c.then(function(a){g.path("/")})},a.updatePlayground=function(){var a={name:$("input[name=name]").val(),county:$("input[name=county]").val(),geoLat:$("input[name=geoLat]").val(),geoLng:$("input[name=geoLng]").val(),description:$("input[name=description]").val(),isEnclosed:0,facilities:$("input[name=facilities]").val(),images:$("input[name=images]").val(),surface:$("input[name=surface]").val(),age:$("input[name=age]").val(),id:$("input[name=pid]").val()};console.log(a.id);var c=b.updatePlayground(a);c.then(function(a){g.path("/")})};var h=b.getPlayground(e.id);h.then(function(b){a.playground={},a.playground.title=b.data.name,a.playground.location=b.data.county,a.playground.county=b.data.county,a.playground.surface=b.data.surface,a.playground.age=b.data.age,a.playground.facilities=b.data.facilities,a.playground.description=b.data.description,a.playground.images=b.data.images,a.playground.isEnclosed=b.data.isEnclosed,a.playground.geoLat=b.data.geoLat,a.playground.geoLng=b.data.geoLng,a.playground.id=b.data.id})}]),angular.module("playgroundApp").directive("playgroundMap",function(){return{restrict:"E",templateUrl:"views/map.html",controller:"playgroundCtrl"}}),angular.module("playgroundApp").directive("tooltip",function(){return{restrict:"A",link:function(a,b,c){$(b).hover(function(){$(b).tooltip("show")},function(){$(b).tooltip("hide")})}}}),angular.module("playgroundApp").controller("LoadingCtrl",["$scope","application","$location",function(a,b,c){b.registerListener(function(){c.path("/")})}]),angular.module("playgroundApp").service("application",function(){var a=!1,b=[],c=function(){$.each(b,function(a){b[a]()})};return{isReady:function(){return a},makeReady:function(){a=!0,c()},unReady:function(){a=!1,c()},registerListener:function(c){a?c():b.push(c)}}}),angular.module("playgroundApp").service("weatherService",["$http","$q",function(a,b){this.baseYahooURL="https://query.yahooapis.com/v1/public/yql?q=",this.getWeather=function(c){var d=b.defer(),e="select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='"+c+", IRE')and u='c'&format=json",f=this.baseYahooURL+e;return a.get(f).then(function(a){d.resolve(a)}),d.promise}}]);