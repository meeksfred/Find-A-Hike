(function(module){
  var homeController = {};

  homeController.index = function(ctx, next){
    $('.contact-us').hide();
    $('.team').hide();
    $('#filter-box').show();
    $('#mapCurrentDisplay').show();
    $('#googleMap').show();
    $('#slider').show();
    $('.weather-bar').show();

    next();
  }
  module.homeController = homeController;
})(window)
