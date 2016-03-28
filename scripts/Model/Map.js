var map

(function(module){
  var startMap = {};

  startMap.initialize = function(ctx, next) {
    var myLatlng = new google.maps.LatLng(47.3301293,-120.4890687);
    startMap.mapProp = {
      center: myLatlng,
      zoom:7,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
    };
    startMap.marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!',
      draggable: true
    });
    map = new google.maps.Map(document.getElementById("googleMap"),startMap.mapProp);
    console.log(map);
    console.log(ctx);
    console.log(next);
    next();
  };

  startMap.displayMap = function(ctx){
    console.log(map);
//    google.maps.event.addDomListener(window, 'load', startMap.initialize);
    startMap.marker.setMap(map);
  };


  module.startMap = startMap;
})(window)
