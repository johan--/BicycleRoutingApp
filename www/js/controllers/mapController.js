angular.module('starter').controller('MapController',
     [ '$scope',
       '$cordovaGeolocation',
       '$stateParams',
       function(
	   $scope,
	   $cordovaGeolocation,
	   $stateParams
       ) {
	   var routing = L.Routing.control({
	       router: new L.Routing.OSRMwithCid('e6da160b-a484-4a0e-880e-9e822fa41198',
						 {
						     serviceUrl: 'https://api.apim.ibmcloud.com/mushjpibmcom-lodsigspace/sb/viaroute'
						 }),
	       waypoints: [
		   L.latLng(40.778814,-73.962429),
		   L.latLng(40.7034482,-74.0168881)
	       ],
	       routeWhileDragging: true,
	       geocoder: L.Control.Geocoder.nominatim(),
	       lineOptions: {
		   styles: [
		       {color: 'black', opacity: 1, weight: 10},
		       {color: 'white', opacity: 1, weight: 10},
		       {color: 'red', opacity: 1, weight: 10}
		   ]
	       },
	   });
	   
	   /**
	    * Once state loaded, get put map on scope.
	    */
	   $scope.$on("$stateChangeSuccess", function() {
               $scope.map = {
		   defaults: {
		       tileLayer: 'http://tile.openstreetmap.jp/{z}/{x}/{y}.png',
		       maxZoom: 18,
		       zoomControlPosition: 'topleft'
		   },
		   center: {},
		   controls: {
		       custom: [routing],
		       scale: true
		   },
		   markers : {},
		   events: {
		       map: {
			   enable: ['click','context'],
			   logic: 'emit'
		       }
		   }
               };
	       
	   });
	   
	   /**
	    * Center map on user's current position
	    */
	   $scope.locate = function(){
               $cordovaGeolocation
		   .getCurrentPosition()
		   .then(function (position) {
		       $scope.map.center.lat  = position.coords.latitude;
		       $scope.map.center.lng = position.coords.longitude;
		       $scope.map.center.zoom = 15;
		       
		       $scope.map.markers.now = {
			   lat:position.coords.latitude,
			   lng:position.coords.longitude,
			   message: "Present Location",
			   focus: true,
			   draggable: false
		       };
		       
		   }, function(err) {
		       // error
		       console.log("Location error!");
		       console.log(err);
		   });
	   };
	   
	   var hide = false;
	   $scope.routeShowHide = function(){
	       if(hide) {
		   routing.show();
		   hide = false;
	       } else {
		   routing.hide();
		   hide = true;
	       }
	   };
       }]);
