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

   var setMarkers = function() {
     var lat = markersModel.resultsMarkers.lat;
     var lng = markersModel.resultsMarkers.lng;
     var latlngset;
     latlngset = new google.maps.LatLng(lat, lng);
     var marker = new google.maps.Marker({
       map: map,
       icon: 'pin.png',
       position: latlngset
     });
     return marker;

    }

  trailheadController.load = function() {
    console.log('made it to load');
    $('#resultsMap').hide();
    $('.secondary-filter').hide();
    $('#radius-filter').show();

    Trails.createTable();
    Trails.grabData();
  }

  trailheadController.index = function(ctx, next) {
    $('#radius-filter').hide();
    $('.secondary-filter').show();
    // $('#googleMap').hide();
    // $('#resultsMap').show();
    startMap.marker.setMap(null);


    markersModel.resultsMarkers.forEach(function(inst) {
      setMarkers(inst).startMap.marker.setMap('#googleMap');
      console.log(inst);
    });



    next();
  };

  trailheadController.filterByRadius = function(ctx, next) {
    // e.preventDefault();
    var $radiusVal = $('#radius-filter').val();
    console.log('radius', $radiusVal);
    markersModel.resultsMarkers = Trails.all.filter(function(trail){
      return haversineDistance(mapView.chosenLat, mapView.chosenLng, trail.lat, trail.lng, true) <= $radiusVal;
    });
    var markers = [];
    markersModel.resultsMarkers.forEach(function(trail){
      var latLng = new google.maps.LatLng(trail.lat, trail.lng);
      var name = trail.name;
      var rating = trail.rating;
      var length = trail.length;
      var elevGain = trail.elevGain;
      var elevMax = trail.elevMax;
      var marker = new google.maps.Marker({'position': latLng, 'name': name, 'rating': rating, 'length': length, 'elevGain': elevGain, 'elevMax': elevMax});
      markers.push(marker);
      console.log(markers);
    });
    markers.forEach(function(marker) {
      var infowindow = new google.maps.InfoWindow({
        content: "<p><strong>Name:</strong> " + marker.name + "</p>" +
                 "<p><strong>Rating:</strong> " + marker.rating + "</p>" +
                 "<p><strong>Length(mi):</strong> " + marker.length + "</p>" +
                 "<p><strong>Elevation Gain(ft):</strong> " + marker.elevGain + "</p>" +
                 "<p><strong>Elevation Max(ft):</strong> " + marker.elevMax + "</p>"
      });
      marker.addListener('click', function() {
        infowindow.open(startMap.map, marker);
      });
    });
    console.log(markers[0].name);
    var MarkerCluster = new MarkerClusterer(startMap.map, markers);

    console.log('trails', Trails.all);
    console.log('markers', markersModel.resultsMarkers);
  };

  trailheadController.filterByDistance = function(ctx, next) {

  }

  trailheadController.filterByElevationGain = function(ctx, next) {

  }

  trailheadController.filterByRating = function(ctx, next) {

  }



  module.trailheadController = trailheadController;
})(window);
