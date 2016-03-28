var map;

(function(module){
  var startMap = {};

  startMap.initialize = function() {
    var mapProp = {
      center: {lat: 51.508742, lng: -0.120850},
      zoom:5
    };
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }





  module.startMap = startMap;
})(window)
