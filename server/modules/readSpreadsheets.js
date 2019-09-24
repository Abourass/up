const fs = require('fs-extra');
const path = require('path');

const readSpreadsheets = async(folder) => {
  try {
    return fs.readdirSync(path.join(folder)); // buildLocalDatabase(file).then(() => { console.log('No more await'); });
  } catch (err){
    console.error(err);
  }
};
module.exports = {readSpreadsheets};
