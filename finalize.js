var fs = require('fs');
var utils = require('./util.js');
var lookup = require('./cityLookup.js');

fs.readFile('./cities_penultimate_array.json', 'utf8', function (err, data) {
  if (err) throw err;

  finalize(JSON.parse(data));
});

function finalize(citiesArray) {
  for(var i in citiesArray) {
    var c = citiesArray[i];

    if(!c.city || c.city.length<=0) throw JSON.stringify(citiesArray[i]);
    if(!c.state || c.state.length<=0) throw JSON.stringify(citiesArray[i]);
    if(!c.loc || isNaN(c.loc[0]) || isNaN(c.loc[1])) throw JSON.stringify(citiesArray[i]);
    if(!c.pops) throw JSON.stringify(citiesArray[i]);
    for(var j = 0; j < 8; j++) {
      if(isNaN(c.pops[j])) throw JSON.stringify(citiesArray[i]);
    }
  }
}
