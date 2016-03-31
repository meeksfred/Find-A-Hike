(function(module){
  var homeController = {};

  homeController.index = function(ctx, next){
    simpleweather.loadAll();
    $('.contact-us').hide();
    $('.team').hide();
    $('#filter-box').show();
    $('#all-secondary-filters').hide();
    $('#mapCurrentDisplay').show();
    $('#googleMap').show();
    $('#slider').show();
    $('.weather-bar').show();

    next();
  };
  module.homeController = homeController;
})(window);
