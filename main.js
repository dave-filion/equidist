var https = require('https');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var events = require('events');
var request = require('request');
var _ = require('underscore');

var apiKeyFilePath = path.join(__dirname, 'api.key'),
    apiKey = fs.readFileSync(apiKeyFilePath, {encoding: 'utf-8'}).trim();

// mode can be walking / bicycling / transit
var getDirections = function(start, end, mode, out) {
  var query = querystring.stringify({
    key: apiKey,
    origin: start,
    destination: end,
    mode: mode
  });

  var url = 'https://maps.googleapis.com/maps/api/directions/json?' + query;
  console.log('GET ' + url);
  request(url, function(err, response, body) {
    if (!err) {
      console.log('STATUS: ' + response.statusCode);
      var parsed = JSON.parse(body);
      var routes = parsed.routes;
      var route = _.first(routes);
      var legs = route.legs;
      _.each(legs, function(leg) {
        var steps = leg.steps;
        console.log(_.size(steps) + " steps");

        _.each(steps, function(step) {
          var startLoc = step.start_location;
          var endLoc = step.end_location;
          var htmlInstr = step.html_instructions;
          var duration = step.duration;
          var seconds = duration.value;
          var mode = step.travel_mode;
          console.log(mode + ": " + htmlInstr + " - " + seconds + "s" );
          console.log('FROM: ' + startLoc.lat + " " + startLoc.lng + " TO " + endLoc.lat + " " + endLoc.lng);

          // Only substeps if mode is Transit (describe driving or walking dirs)
          var substeps = step.steps;
          _.each(substeps, function(substep) {
            console.log(substep);
          });

        });
      });
    }
  });
};

getDirections('262 10th st brooklyn ny', '163 varick st new york NY', 'transit');
