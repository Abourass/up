import fs from 'fs-extra';
import path from 'path';

export const readSpreadsheets = async(folder) => {
  try {
    return fs.readdirSync(path.join(folder)); // buildLocalDatabase(file).then(() => { console.log('No more await'); });
  } catch (err){
    console.error(err);
  }
};
export default {readSpreadsheets};
