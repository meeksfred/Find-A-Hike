(function(module) {

  trailsView = {};

  trailsView.secondaryFilters = function() {
    $('.secondary-filter').on('change', 'select', function() {
      var selected = this.id.replace('-filter', '');
      page('/' + selected + '/' + $(this).val().replace(/\W+/g, '+'));
    });
  };

})
