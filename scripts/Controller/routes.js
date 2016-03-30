page('/', homeController.index,
          startMap.initialize,
          mapView.displayMap,
          mapView.dragMarkStart,
          trailheadController.load);

page('/search', trailheadController.index,
                trailheadController.filterByRadius,
                trailheadController.createMarkers);

page('/about',aboutController.index);

page('/contact', contactController.index);
page();
