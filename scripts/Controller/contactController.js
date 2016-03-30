(function(module){
  contactController = {};

  contactController.index = function(){
    $('#filter-box').hide();
    $('#mapCurrentDisplay').hide();
    $('#googleMap').hide();
    $('#slider').hide();
    $('.team').hide();
    $('.weather-bar').hide();
    $('.contact-us').show();
  }

  module.contactController = contactController;
})(window)
