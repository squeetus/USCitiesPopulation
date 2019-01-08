var fs = require('fs');
var utils = require('./util.js');
var lookup = require('./cityLookup.js');

const csvFilePath = './PEP_2017_PEPANNRSIP.US12A_with_ann.csv';
const csv = require('csvtojson');

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    cleanCensusCities(jsonObj);
});

function cleanCensusCities(data) {

  var cities_penultimate = [];

  function identifier(city) { return city.Geography.replace(",","").replace(/ /g, "_").trim().toLowerCase()}

  for(var c in data) {

    city = data[c];
    city.identifier = identifier(city);

    // if we have location data, move along
    if((city = lookup.find(city))) {
      delete city.pop;
      cities_penultimate.push(city);
    } else {
      console.log(city);
    }
  }

  // these are the cities that fail the simple catch-all cases in lookup
  cities_penultimate.push({
    "city":"Nashville",
    "state":"Tennessee",
    "loc":[36.1626638,-86.7816016],
    "pops":[604799,612206,625529,635702,645950,656962,664762, 667560]
  });
  cities_penultimate.push({
    "city":"Louisville",
    "state":"Kentucky",
    "loc":[38.2526647,-85.7584557],
    "pops":[596990,600444,604588,610031,612679,615435,618030,621349]
  });
  cities_penultimate.push({
    "city":"Honolulu",
    "state":"Hawaii",
    "loc":[21.3069444,-157.8583333],
    "pops":[339088,342728,346171,349046,350183,352461,351859,350395]
  });
  cities_penultimate.push({
    "city":"Lexington-Fayette",
    "state":"Kentucky",
    "loc":[38.0405837,-84.5037164],
    "pops":[296702,301368,305303,308591,310886,315055,319052,321959]
  });
  cities_penultimate.push({
    "city":"Anchorage",
    "state":"Alaska",
    "loc":[61.2180556,-149.9002778],
    "pops":[293370,296291,298520,301081,300296,298018,297376,294356]
  });
  cities_penultimate.push({
    "city":"Augusta-Richmond County",
    "state":"Georgia",
    "loc":[33.4734978,-82.0105148],
    "pops":[196165,195682,196859,196435,196607,196930,197357,197166]
  });
  cities_penultimate.push({
    "city":"Macon",
    "state":"Georgia",
    "loc":[32.8406946,-83.6324022],
    "pops":[155614,156009,156459,154869,154221,153857,153006,152663]
  });
  cities_penultimate.push({
    "city":"Athens-Clarke County",
    "state":"Georgia",
    "loc":[33.9519347,-83.357567],
    "pops":[116213,117163,118860,119804,119424,122557,123670,125691]
  });
  cities_penultimate.push({
    "city":"Millcreek",
    "state":"Utah",
    "loc":[40.6869, -111.8755],
    "pops":[58847,59432,59907,60357,60260,60273,60416,60192]
  });
  cities_penultimate.push({
    "city":"Weymouth Town",
    "state":"Massachusetts",
    "loc":[42.2180724,-70.9410356],
    "pops":[53823,54177,55045,55450,55693,55777,55865,56664]
  });
  cities_penultimate.push({
    "city": "Stonecrest",
    "state": "Georgia",
    "loc":[33.7010, -84.1719],
    "pops":[50256,50817,51642,52159,52768,53541,54148,54471]
  });

  utils.saveDataToFile('./cities_penultimate_array.json', JSON.stringify(cities_penultimate));
}
