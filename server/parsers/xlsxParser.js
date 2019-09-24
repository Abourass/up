const fs = require('fs');
const path = require('path');
const {addProjectID} = require('../modules/addProjectID.mjs');
const {readSpreadsheets} = require('../modules/readSpreadsheets.mjs');
const {asyncForEach} = require('../modules/asyncForEach.mjs');
const {convertToJSON} = require('../modules/spreadsheetToJSON.mjs');
const {trimName} = require('../modules/cleanNames.mjs');
const {correctHeaders} = require('../modules/correctHeaders.mjs');
const {insertDocuments} = require('../modules/insertManyToDB.mjs');

const config = JSON.parse(fs.readFileSync('parser.config.json')),

  parser = async() => {
    const arrayOfFiles = await readSpreadsheets('assets'), cleanedFiles = [];
    await asyncForEach(arrayOfFiles, async(file) => {
      const cleanName = trimName(file),
        fileAsJSON = await convertToJSON(file),
        correctedJSON = await correctHeaders({arrayOfJSON: fileAsJSON, customDictionary: config.customDictionary, minConfidence: config.minConfidence, loggingLevel: config.logging}),
        projectAddedArray = await addProjectID({convert: correctedJSON, name: cleanName});
      await asyncForEach(projectAddedArray, async(order, i) => {
        if (!fs.existsSync(path.join(config.conversionFolder, `${cleanName}-${i}.json`))){
          await fs.writeFileSync(path.join(config.conversionFolder, `${cleanName}-${i}.json`), JSON.stringify(order, null, 2));
        } else {
          await fs.writeFileSync(path.join(config.conversionFolder, `${cleanName}-${Date.now()}.json`), JSON.stringify(order, null, 2));
        }
      });
    });
    const response = await insertDocuments({conversionFolder: config.conversionFolder, loggingLevel: config.loggingLevel});
    console.log(response);
    process.exit(0);
  };
parser().catch(err => console.error(err));
