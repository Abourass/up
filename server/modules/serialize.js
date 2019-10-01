const FuzzySet = require('fuzzyset.js');
const {asyncForEach} = require('./asyncForEach.js');

const renameProp = (oldProp, newProp, {[oldProp]: old, ...others}) => ({[newProp]: old, ...others});

const serializeJSON = async({arrayOfJSON, customDictionary, minConfidence, loggingLevel} = {}) => {
  console.log(arrayOfJSON);
  try {
    const arrayOfCorrectedJSON = [];
    await asyncForEach(arrayOfJSON, async(json) => {
      const spellCheck = FuzzySet(), correctionArray = [], arrayOfCorrections = [],
        headers = await Object.keys(json),
        spellChecked = await asyncForEach(customDictionary, async(correctHeader) => {
          await spellCheck.add(correctHeader); // Add the custom dictionary to the spell check function
        });
      if (loggingLevel === 'verbose') {
        console.time('Compared Headers to the Correct Headers Dictionary in');
        headers.forEach((header, i) => {
          correctionArray.push(spellCheck.get(header, header, minConfidence));
        });
        console.timeEnd('Compared Headers to the Correct Headers Dictionary in');
      } else {
        headers.forEach((header) => {
          correctionArray.push(spellCheck.get(header, header, minConfidence));
        });
      }
      headers.forEach((header, i) => {
        const suggestion = correctionArray[i][0][1];
        json[suggestion] = json[header];
        delete json[header];
      });
      correctionArray.forEach((correction, index) => {
        if (loggingLevel === 'verbose') {
          const logCabin = {
            originalString: headers[index],
            suggestion: correction[0][1],
            confidence: `${Math.round(correction[0][0] * 100)}%`,
          };
          console.log(`Correction #${index}`);
          console.table(logCabin);
        }
        if (typeof correction[0][1] !== 'undefined') {
          arrayOfCorrections.push(correction[0][1]);
        } else {
          console.error(`Could not find match for ${correction} at ${index}`);
          process.exit(1);
        }
      });
      arrayOfCorrectedJSON.push(json);
    });
    return arrayOfCorrectedJSON;
  } catch (err) {
    console.error(err);
  }
};
module.exports = serializeJSON;
