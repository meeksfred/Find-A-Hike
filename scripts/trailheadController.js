(function(module) {
  var trailheadController = {};


  var haversineDistance =  function(lat1, lon1, lat2, lon2, isMiles) {
    function toRad(x) {
      return x * Math.PI / 180;
    }

    var lon1 = lon1;
    var lat1 = lat1;

    var lon2 = lon2;
    var lat2 = lat2;

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
       Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if(isMiles) d /= 1.60934;

    return d;
  };

  trailheadController.load = function() {
    $('.secondary-filter').hide();
    $('#radius-filter').show();

    Trails.createTable();
    Trails.grabData();
  };

  trailheadController.index = function(ctx, next) {
    $('#radius-filter').hide();
    $('#all-secondary-filters').show();
    $('.secondary-filter').show();

    startMap.marker.setMap(null);

    trailheadController.distanceFilterListener();
    trailheadController.elevationFilterListener();
    trailheadController.ratingFilterListener();


    next();
  };

  trailheadController.filterByRadius = function(ctx, next) {
    var $radiusVal = $('#radius-filter').val();
    markersModel.resultsMarkers = Trails.all.filter(function(trail){
      return haversineDistance(mapView.chosenLat, mapView.chosenLng, trail.lat, trail.lng, true) <= $radiusVal;
    });
    next();
  };
  trailheadController.createMarkers = function(ctx, next) {
    markers = [];
    markersModel.resultsMarkers.forEach(function(trail){
      var latLng = new google.maps.LatLng(trail.lat, trail.lng);
      var name = trail.name;
      var rating = trail.rating;
      var length = trail.length;
      var elevGain = trail.elevGain;
      var elevMax = trail.elevMax;
      var marker = new google.maps.Marker({'position': latLng, 'name': name, 'rating': rating, 'length': length, 'elevGain': elevGain, 'elevMax': elevMax});
      markers.push(marker);
    });
    markers.forEach(function(marker) {
      var infowindow = new google.maps.InfoWindow({
        content: '<p><strong>Name:</strong> ' + marker.name + '</p>' +
                 '<p><strong>Rating:</strong> ' + marker.rating + '</p>' +
                 '<p><strong>Length(mi):</strong> ' + marker.length + '</p>' +
                 '<p><strong>Elevation Gain(ft):</strong> ' + marker.elevGain + '</p>' +
                 '<p><strong>Elevation Max(ft):</strong> ' + marker.elevMax + '</p>'
      });
      marker.addListener('click', function() {
        infowindow.open(startMap.map, marker);
      });
    });
    trailheadController.markerCluster = new MarkerClusterer(startMap.map, markers);
  };
  trailheadController.clearMarkers = function(){
    markers.forEach(function(marker){
      marker.setMap(null);
    });
    trailheadController.markerCluster.clearMarkers();
  };
  trailheadController.filterByDistance = function() {
    trailheadController.clearMarkers();
    markersModel.resultsMarkers = markersModel.resultsMarkers.filter(function(marker){
      return marker.length < trailheadController.selectedDistance;
    });
    trailheadController.createMarkers();
  };
  trailheadController.distanceFilterListener = function() {
    $('#distance-filter').on('change', function(){
      trailheadController.selectedDistance = $('#distance-filter').val();
      trailheadController.filterByDistance();
    });
  };
  trailheadController.filterByElevationGain = function(ctx, next) {
    trailheadController.clearMarkers();
    markersModel.resultsMarkers = markersModel.resultsMarkers.filter(function(marker){
      return marker.elevGain < trailheadController.selectedElev;
    });
    trailheadController.createMarkers();
  };

  trailheadController.elevationFilterListener = function() {
    $('#elevation-filter').on('change', function(){
      trailheadController.selectedElev = $('#elevation-filter').val();
      trailheadController.filterByElevationGain();
    });
  };

  trailheadController.filterByRating = function(ctx, next) {
    trailheadController.clearMarkers();
    markersModel.resultsMarkers = markersModel.resultsMarkers.filter(function(marker){
      return marker.rating > trailheadController.selectedRating;
    });
    trailheadController.createMarkers();
  };

  trailheadController.ratingFilterListener = function() {
    $('#rating-filter').on('change', function(){
      trailheadController.selectedRating = $('#rating-filter').val();
      trailheadController.filterByRating();
    });
  };

  module.trailheadController = trailheadController;
})(window);
