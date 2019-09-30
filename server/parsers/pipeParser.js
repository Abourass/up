const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const pipeParser = async() => {
  const readFile = async(orderFile) => {
      try {
        const contents = orderFile;
          if (!contents) {
            console.error('Failed to read input');
            process.exit(1);
          }
          Papa.parse(contents, {
            delimiter: '', // auto-detect
            newline: '', // auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: true,
            transformHeader: undefined,
            dynamicTyping: false,
            preview: 0,
            encoding: '',
            worker: false,
            comments: false,
            step: undefined,
            complete: async function(results, file) {
              console.log('Parsing complete:');
              return await results;
            // console.log(results); console.log(file);
            },
            error: undefined,
            download: false,
            downloadRequestHeaders: undefined,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
            transform: undefined,
            delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
          });

      } catch (err) { console.error(err); }
    };

  s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
    if (err) console.error(err);
    const pipeFile = await data.Body.toString();
    const fileAsJSON = await parseXML(xmlFile); // convert it to JSON
    const dbSerializedJSON = await serializeJSON({arrayOfJSON: fileAsJSON, customDictionary: config.customDictionary, minConfidence: config.minConfidence, loggingLevel: config.logging}); // serialize the JSON keys
    await addProjectID({arrayOfOrders: dbSerializedJSON, clientID: clientID, clientName: clientName});
    // todo finish grabbing function pieces from other parser to put this one togetherh
  });
};

pipeParser().catch(err => console.error(err));
