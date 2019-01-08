var fs = require('fs');
var utils = require('./util.js');

fs.readFile('./cities.json', 'utf8', function (err, data) {
  if (err) throw err;
  var cities = cleanCities(JSON.parse(data));
});

function cleanCities(data) {

  function identifier(city) { return city.fields.city.replace(/ /g, "_").trim().toLowerCase() + "_" + city.fields.state.replace(/ /g, "_").trim().toLowerCase();}

  var city, obj, cities = {}, city_array = [];


  for(var c in data) {
    city = data[c];

    // sanity check - only prints if duplicate city_state found
    if(cities[identifier(city)] !== undefined) {
      console.log('exists!', city.fields.city, ",", city.fields.state);
    }

    obj = {
      'city': city.fields.city,
      'state': city.fields.state,
      'pop': city.fields.population,
      'loc': city.fields.coordinates
    };

    cities[identifier(city)] = obj;
    city_array.push(obj);
  }

  utils.saveDataToFile('./cities_clean_array.json', JSON.stringify(city_array));
  utils.saveDataToFile('./cities_clean_obj.json', JSON.stringify(cities));

}
