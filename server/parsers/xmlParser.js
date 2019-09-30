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
    const parseXML = (xmlData) => {
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
      let jsonObj = parser.parse(xmlData[options]);
      // it'll return an object in case it's not valid
      if (parser.validate(xmlData) === true) { jsonObj = parser.parse(xmlData, options); }
      const tObj = parser.getTraversalObj(xmlData, options); // Intermediate obj
      jsonObj = parser.convertToJson(tObj, options);
      return jsonObj
    };

    s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
      if (err) console.error(err);
      const xmlFile = await data.Body.toString();
      const fileAsJSON = await parseXML(xmlFile); // convert it to JSON
      const dbSerializedJSON = await serializeJSON({arrayOfJSON: fileAsJSON, customDictionary: config.customDictionary, minConfidence: config.minConfidence, loggingLevel: config.logging}); // serialize the JSON keys
      await addProjectID({arrayOfOrders: dbSerializedJSON, clientID: clientID, clientName: clientName});
    });

  } catch (err) {console.error(err)}
};


module.exports = xmlParser;
