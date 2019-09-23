import fs from 'fs-extra';
import path from 'path';
import {Client} from './database.mjs';
import {asyncForEach} from './asyncForEach.mjs';

export const buildLocalClientDB = async(clientNames) => {
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
export default {buildLocalClientDB};
