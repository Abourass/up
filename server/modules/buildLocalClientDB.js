const fs = require('fs-extra');
const path = require('path');
const {Client} = require('./database.js');
const {asyncForEach} = require('./asyncForEach.js');

const buildLocalClientDB = async(clientNames) => {
  const allClients = [], clientNamesArray = Array.from(clientNames);
  try {
    await asyncForEach(clientNamesArray, (clientName, i) => {
      console.log(`Writing Client: ${i}/${clientNamesArray.length - 1}`);
      Client.findOne({name: clientName}).then((foundClient) => {
        allClients.unshift(foundClient);
        fs.writeFileSync(path.join('db', 'clientDB.json'), JSON.stringify(allClients, null, 2));
        if (i === clientNamesArray.length - 1) {
          console.log('Done Writing Clients');
          process.exit(0);
        }
      });
    });
  } catch (err){
    console.error(err);
  }
};
module.exports = {buildLocalClientDB};
