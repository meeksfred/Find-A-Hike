(function(module){
  var Map = {};

  navigator.geolocation.getCurrentPosition(function(position) {
    Map.initialize(position.coords.latitude, position.coords.longitude);
  });

  Map.initialize = function(currentLat, currentLon){
    var mapProp = {
      center: new google.aps.LatLng(47.3301293,-120.4890687),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var marker = new google.maps.Marker({
    position: {lat: currentLat, lon: currentLon},,
    map: map,
    draggable: true;
    title: 'Center your search here!'
  });

  }


  module.Map = Map;
})(window)
