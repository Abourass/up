const parser = require('fast-xml-parser');
const AWS = require('aws-sdk');
const {addProjectID} = require('../modules/addProjectID.js');
const serializeJSON = require('../modules/serialize.js');
const he = require('he');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'parser.config.json')));
const s3 = new AWS.S3();

const xmlParser = async({bucket: bucket, key: key, clientID: clientID, clientName: clientName} = {}) => {
  try{
    s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
      if (err) console.error(err);
      const options = {
        attributeNamePrefix: '@_',
        attrNodeName: 'attr', // default is 'false'
        textNodeName: '#text',
        ignoreAttributes: true,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
        trimValues: true,
        cdataTagName: '__cdata', // default is 'false'
        cdataPositionChar: '\\c',
        localeRange: '', // To support non english character in tag/attribute values.
        parseTrueNumberOnly: false,
        attrValueProcessor: a => he.decode(a, {isAttributeValue: true}), // default is a=>a
        tagValueProcessor: a => he.decode(a), // default is a=>a
      };
      let jsonObj;

      const tObj = await parser.getTraversalObj(data.Body.toString(), options); // Intermediate obj
      jsonObj = await parser.convertToJson(tObj, options);
      const results = jsonObj.root.element;
      console.log('Conversion results', results);
      const dbSerializedJSON = await serializeJSON({
        arrayOfJSON: results,
        customDictionary: config.customDictionary,
        minConfidence: config.minConfidence,
        loggingLevel: config.logging
      }); // serialize the JSON keys
      console.log(dbSerializedJSON)
      await addProjectID({
        arrayOfOrders: dbSerializedJSON,
        clientID: clientID,
        clientName: clientName
      });
    });
  } catch (err) {console.error(err)}
};


module.exports = xmlParser;
