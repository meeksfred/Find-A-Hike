(function(module){
  var aboutController = {};

  aboutController.index = function(){
    $('#filter-box').hide();
    $('#mapCurrentDisplay').hide();
    $('#googleMap').hide();
    $('#slider').hide();
    $('.contact-us').hide();
    $('#weather-bar').hide();
    $('.team').show();
  }

  module.aboutController = aboutController;
})(window)
