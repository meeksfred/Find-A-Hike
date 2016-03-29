(function(module) {

  var resultsMap = {};
  resultsMap.map = {};

  resultsMap.initialize = function(ctx, next) {
    var newLatlng = new google.maps.LatLng(mapView.chosenLat,mapView.chosenLng);
    resultsMap.mapProp = {
      center: newLatlng,
      zoom:7,
    };
    console.log(resultsMap.mapProp);

    resultsMap.map = new google.maps.Map(document.getElementById("resultsMap"), resultsMap.mapProp);
    next();
  };
  console.log(resultsMap.map);


  module.resultsMap = resultsMap;

})(window);
