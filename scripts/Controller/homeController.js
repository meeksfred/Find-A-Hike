(function(module){
  var homeController = {};

  homeController.index = function(ctx, next){
    simpleweather.loadAll();
    homeSlider.go();
    $('.contact-us').hide();
    $('.team').hide();
    $('#all-secondary-filters').hide();
    $('#slider').show();
    $('#filter-box').show();
    $('#filter-button').show();
    $('#mapCurrentDisplay').show();
    $('#googleMap').show();
    $('#weather-bar').show();

    next();
  };

  module.homeController = homeController;
})(window);
