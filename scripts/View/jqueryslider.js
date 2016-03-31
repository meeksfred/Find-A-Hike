(function(module){

  var homeSlider = {};

  homeSlider.go = function(){
    $('.bxslider').bxSlider({
      auto: true
    });
  };

  module.homeSlider = homeSlider;

})(window);
