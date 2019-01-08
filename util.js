var fs = require('fs');

module.exports.saveDataToFile = function(filename, data) {
  fs.writeFile(filename, data, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Saved data to file: ", filename);
  });
};
