const XLSX = require('xlsx');

/* For debugging */
const stream = XLSX.stream.to_json(worksheet, {raw: true}); // to_json returns an object-mode stream
const converter = new Transform({writableObjectMode: true});
converter._transform = function(obj, event, cb){ cb(null, JSON.stringify(obj) + '\n'); };
stream(converter);
converter.pipe(process.stdout);
