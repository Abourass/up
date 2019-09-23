import fs from 'fs-extra';
import {Orders} from './database.mjs';
import {asyncForEach} from './asyncForEach.mjs';
const orderArray = [];

export async function insertDocuments({conversionFolder, loggingLevel} = {}) {
  try {
    const arrayOfFiles = await fs.readdirSync(conversionFolder);
    arrayOfFiles.forEach((JSONFile) => {
      orderArray.push(JSON.parse(fs.readFileSync(conversionFolder + JSONFile, 'utf-8')));
    });
    await Orders.insertMany(orderArray);
    return `Inserted ${orderArray.length} into your collection`;
  } catch (e) {
    console.error(e);
  }
}
export default {insertDocuments};
