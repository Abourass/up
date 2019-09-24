const {readSpreadsheets} = require('../modules/readSpreadsheets.mjs');
const {asyncForEach} = require('../modules/asyncForEach.mjs');
const {trimName} = require('../modules/cleanNames.mjs');
const {buildLocalClientDB} = require('../modules/buildLocalClientDB.mjs');

const buildClientDB = async() => {
  try {
    const arrayOfFiles = await readSpreadsheets('assets'), cleanedFiles = [];
    await asyncForEach(arrayOfFiles, async(file) => {
      await cleanedFiles.unshift(trimName(file));
    });
    const uniqueClientSet = new Set(cleanedFiles); // The definition of a 'set' guarantees that each of its members are unique
    await buildLocalClientDB(uniqueClientSet); // Get Unique Client Names for Local Project / Client DB
  } catch (err) {
    console.error(err);
  }
};
// Starts parsing as soon as you run
buildClientDB();
