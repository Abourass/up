const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const AWS = require('aws-sdk');
const {addProjectID} = require('../modules/addProjectID.js');
const serializeJSON = require('../modules/serialize.js');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'parser.config.json')));
const s3 = new AWS.S3();

const spreadsheetParser = async({bucket: bucket, key: key, clientID: clientID, clientName: clientName} = {}) => {
  try{
    s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
      if (err) console.error(err);
      const workbook = XLSX.read(data.Body, {type: 'buffer'});
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Grab the sheets from the spreadsheet
      const fileAsJSON = await XLSX.utils.sheet_to_json(worksheet); // convert it to JSON
      const dbSerializedJSON = await serializeJSON({arrayOfJSON: fileAsJSON, customDictionary: config.customDictionary, minConfidence: config.minConfidence, loggingLevel: config.logging}); // serialize the JSON keys
      await addProjectID({arrayOfOrders: dbSerializedJSON, clientID: clientID, clientName: clientName});
    });
  } catch (err) {console.error(err)}
};
module.exports = spreadsheetParser;
