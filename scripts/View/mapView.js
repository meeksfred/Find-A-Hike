(function(module){
  mapView = {};

    mapView.displayMap = function(ctx, next){
      console.log(startMap.map);
      startMap.marker.setMap(startMap.map);
      mapView.chosenLat = 47.3301293;
      mapView.chosenLng = -120.4890687;
      next();
    };

    mapView.dragMarkStart = function(ctx, next) {
      google.maps.event.addListener(startMap.marker, 'dragend', function(evt){
        document.getElementById('mapCurrentDisplay').innerHTML = '<p class="marker-drag">Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
        mapView.chosenLat = evt.latLng.lat();
        mapView.chosenLng = evt.latLng.lng();
      });

      google.maps.event.addListener(startMap.marker, 'dragstart', function(evt){
        document.getElementById('mapCurrentDisplay').innerHTML = '<p class="marker-drag">Currently dragging marker...</p>';
      });
      next();
    };


  module.mapView = mapView;
})(window)
