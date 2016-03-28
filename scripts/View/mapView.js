(function(module){
  mapView = {};

  mapView.showInitMap = function(){
    mapView.map = new google.maps.Map($('#googleMaps'),startMap.mapProp);
  }

  module.mapView = mapView;
})(window)
