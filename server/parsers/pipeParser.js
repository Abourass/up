const Papa = require('papaparse');
const {addProjectID} = require('../modules/addProjectID.js');
const serializeJSON = require('../modules/serialize.js');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'parser.config.json')));

const pipeParser = async({bucket: bucket, key: key, clientID: clientID, clientName: clientName} = {}) => {

  try{
    await s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
      if (err) console.error(err);
      Papa.parse(data.Body.toString(), {
        delimiter: '', // auto-detect
        newline: '', // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: true,
        transformHeader: undefined,
        dynamicTyping: true,
        preview: 0,
        encoding: '',
        worker: false,
        comments: false,
        step: undefined,
        complete: async function(results, file) {
          console.log('Parsing complete:');
          console.log(results);
          const dbSerializedJSON = await serializeJSON({arrayOfJSON: results.data, customDictionary: config.customDictionary, minConfidence: config.minConfidence, loggingLevel: config.logging}); // serialize the JSON keys
          await addProjectID({arrayOfOrders: dbSerializedJSON, clientID: clientID, clientName: clientName});
          //console.log(file);
        },
        error: undefined,
        download: false,
        downloadRequestHeaders: undefined,
        skipEmptyLines: true,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
      });
    });
  } catch (err) {console.error(err)}
};

module.exports = pipeParser;
