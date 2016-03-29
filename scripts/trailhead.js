(function(module) {
  function Trails (opts) {
    this.rating = opts.rating;
    this.length = opts.length;
    this.kml = opts.kml;
    this.features = opts.features;
    this.name = opts.name;
    this.lat = opts.lat;
    this.lng = opts.lng;
    this.elevGain = opts.elevGain;
    this.id = opts.id;
    this.elevMax = opts.elevMax;
  }

  Trails.all = [];

  Trails.createTable = function(cb) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS trails (' +
        'id INTEGER PRIMARY KEY, ' +
        'rating VARCHAR(10), ' +
        'length VARCHAR(10), ' +
        'kml VARCHAR(50), ' +
        'features VARCHAR(25), ' +
        'name VARCHAR(100), ' +
        'lat VARCHAR(25), ' +
        'lng VARCHAR(25), ' +
        'elevGain VARCHAR(10), ' +
        'elevMax VARCHAR(10));',
      cb
    );
  };

  Trails.prototype.fillTable = function(cb) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO trails (rating, length, kml, features, name, lat, lng, elevGain, elevMax) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
          'data': [this.rating, this.length, this.kml, this.features, this.name, this.lat, this.lng, this.elevGain, this.elevMax],
        }
      ],
      cb
    );
  };

  Trails.grabTableData = function(tableRows) {
    Trails.all = tableRows.map(function(inst) {
      return new Trails(inst);
    })
  }

  Trails.grabData = function(cb) {
    webDB.execute('SELECT * FROM trails', function(tableRows) {
      if (tableRows.length) {
        Trails.grabTableData(tableRows);
        // cb();
      } else {
        $.getJSON('/data/trailheadData.json', function(myData) {
          myData.forEach(function(instance) {
            var trail = new Trails(instance);
            trail.fillTable();
          });
          webDB.execute('SELECT * FROM trails', function(tableRows) {
            Trails.grabTableData(tableRows);
            cb();
          });
        });
      }
    });
  };





  module.Trails = Trails;

})(window);
