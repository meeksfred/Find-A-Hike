(function(module) {
  // Docs at http://simpleweatherjs.com

  var simpleweather = {};

  /* Does your browser support geolocation? */
  simpleweather.locationCheck = function() {
    if ('geolocation' in navigator) {
      $('.js-geolocation').show();
    } else {
      $('.js-geolocation').hide();
    }
  };

  /* Where in the world are you? */
  simpleweather.location = function() {
    $('.js-geolocation').on('click', function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        simpleweather.loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
      });
    });
  };

  /*
   * Test Locations
   * Austin lat/long: 30.2676,-97.74298
   * Austin WOEID: 2357536
   */

  simpleweather.load = function() {
    simpleweather.loadWeather('Seattle', ''); //@params location, woeid
  };


  simpleweather.loadWeather = function(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'f',
      success: function(weather) {
        html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
        html += '<ul><li>' + weather.city + ', ' + weather.region + '</li>';
        html += '<li class="currently">' + weather.currently + '</li>';
        html += '<li>' + weather.alt.temp + '&deg;C</li></ul>';

        $('#weather').html(html);
      },
      error: function(error) {
        $('#weather').html('<p>' + error + '</p>');
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
