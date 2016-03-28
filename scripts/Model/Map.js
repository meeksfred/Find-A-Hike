(function(module){
  var startMap = {};

  navigator.geolocation.getCurrentPosition(function(position) {
    startMap.initialize(position.coords.latitude, position.coords.longitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });

  startMap.initialize = function(currentLat, currentLon, next){
    startMap.mapProp = {
      center: new google.aps.LatLng(47.3301293,-120.4890687),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    startMap.marker = new google.maps.Marker({
      position: {lat: currentLat, lon: currentLon},
      map: map,
      draggable: true,
      title: 'Center your search here!'
    });
    next();
  }

  module.startMap = startMap;
})(window)
