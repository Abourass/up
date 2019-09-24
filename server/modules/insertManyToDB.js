const fs = require('fs-extra');
const {Orders} = require('./database.mjs');
const {asyncForEach} = require('./asyncForEach.mjs');
const orderArray = [];

async function insertDocuments({conversionFolder, loggingLevel} = {}) {
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
module.exports = {insertDocuments};
