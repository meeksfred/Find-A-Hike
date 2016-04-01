(function(module) {

  var simpleweather = {};

  simpleweather.locationCheck = function() {
     if ('geolocation' in navigator) {
       $('.js-geolocation').show();
     } else {
       $('.js-geolocation').hide();
     }
   };

  simpleweather.location = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        simpleweather.loadWeather(position.coords.latitude + ',' + position.coords.longitude);
      });
  };

  simpleweather.load = function() {
    simpleweather.location();
  };


  simpleweather.loadWeather = function(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'f',
      success: function(weather) {
        html = '<ul><li><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</li>';
        html += '<li>' + weather.city + ', ' + weather.region + '</li>';
        html += '<li class="currently">' + weather.currently + '</li>';
        html += '<li>' + weather.alt.temp + '&deg;C</li></ul>';

        $('#weather').html(html);
      },
      error: function(error) {
        $('#weather').html('<p>Loading...</p>');
      }
    });
  };

  simpleweather.loadAll = function() {
    simpleweather.locationCheck();
    simpleweather.location();
    simpleweather.loadWeather();
    simpleweather.load();
  };

  module.simpleweather = simpleweather;

})(window);
