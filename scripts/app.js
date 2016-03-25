
// (function(window, google) {
//   //map options
//   var options = {
//     center: {
//       lat: 47.614069,
//       lng: -122.343113
//     },
//     zoom: 10
//   },
//   element = document.getElementById('map-canvas'),
//     map = new google.maps.Map(element, options)
// }(window, google));


var map;
function initMap() {
  var center = new google.maps.LatLng(47.6138242, -122.3433211);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: center,
    zoom: 10
  });
// Specify location, radius and place types for your Places API search.
  var request = {
    location: center,
    radius: 9000,
    types: ['consulate']
  };


    // Creates the PlaceService and sends the request.
    // Handles the callback with an anonymous function.
var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status){
  if(status == google.maps.place.PlacesServiceStatus.OK){
    for (var i = 0; i < results.length; i++){
      createMarker(results[i]);
    }
  }
}
// If the request succeeds, draw the place location on the map as a marker

function createMarker(place){
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })
}
google.maps.event.addDomListener(window, 'load', initMap);
