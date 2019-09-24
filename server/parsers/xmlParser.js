const parser = require('fast-xml-parser');
const he = require('he');

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
};
module.exports = {parseXML};
