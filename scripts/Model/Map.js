//var map

(function(module){
  var startMap = {};
  startMap.map = {};

  startMap.initialize = function(ctx, next) {
    var myLatlng = new google.maps.LatLng(47.3301293,-120.4890687);
    startMap.mapProp = {
      center: myLatlng,
      zoom:7,
      maxZoom: 15,
      minZoom: 6
    };
    startMap.marker = new google.maps.Marker({
      position: myLatlng,
      map: startMap.map,
      title: 'Hello World!',
      draggable: true
    });

    startMap.map = new google.maps.Map(document.getElementById("googleMap"),startMap.mapProp);
    next();
  };


  module.startMap = startMap;
})(window);
