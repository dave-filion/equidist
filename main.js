var https = require('https');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');

var apiKeyFilePath = path.join(__dirname, 'api.key'),
    apiKey = fs.readFileSync(apiKeyFilePath, {encoding: 'utf-8'}).trim();

// mode can be walking / bicycling / transit
function getDirections(start, end, mode) {
  var query = querystring.stringify({
    key: apiKey,
    origin: start,
    destination: end,
    mode: mode
  });

  var url = 'https://maps.googleapis.com/maps/api/directions/json?' + query;
  console.log('GET ' + url);
  https.get(url, function(res) {
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
    });
  }).on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
}

getDirections('262 10th st brooklyn ny', '163 varick st new york NY', 'transit');
