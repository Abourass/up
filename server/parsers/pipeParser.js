import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

const pipeParser = async() => {
  const writeFile = async(conversionResults) => {
      try {
        await fs.writeFile(path.join('assets', 'conversionResults.json'), JSON.stringify(conversionResults, null, 2), (err => console.error(err)));
        console.log('File Written');
      } catch (err) { console.error(err); }
    },

    readFile = async() => {
      try {
        fs.readFile(path.join('assets', 'OrderFile.txt'), 'utf8', (err, contents) => {
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
              await writeFile(results);
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
        });
      } catch (err) { console.error(err); }
    };
  await readFile();
};

pipeParser().catch(err => console.error(err));
