var utils = require('./util.js');
var CityArray = require('./cities_clean_array.json');
var Cities = require('./cities_clean_obj.json');

module.exports.find = function(city) {
  function cleanup(city) {
    city = city.replace("_(balance)_", "_");
    city = city.replace("_city_", "_");
    city = city.replace("_town_", "_");
    city = city.replace("_village_", "_");
    return city;
  }

  function addPops(c) {
    c.pops = [];
    for(var i = 2010; i < 2018; i++) {
      var attr = 'Population Estimate (as of July 1) - ' + i;
      c.pops.push(+city[attr]);
    }
    return c;
  }

  if(Cities[city.identifier]) {
    return addPops(Cities[city.identifier]);
  } else if(Cities[cleanup(city.identifier)]){
    return addPops(Cities[cleanup(city.identifier)]);
  } else {
    console.log("nerp", city.identifier, '\n--', cleanup(city.identifier));
    return false;
  }

};
