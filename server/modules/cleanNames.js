const trimName = (str) => {
  try {
    let tempStr = str.match(/.[\s\S]+(?=\.xlsx)/g).toString().match(/(^[A-Z])\w\D+/gi).toString(), correctedString = '', rlmStr = '';
    tempStr.split('').forEach((char, inc) => {
      if (char === 'R' && inc === 0){
        rlmStr += 'r';
      } else if (char === 'L' && inc === 1){
        rlmStr += 'l';
      } else if (char === 'M' && inc === 2){
        rlmStr += 'm';
      } else {
        rlmStr += char;
      }
    });
    tempStr = rlmStr;
    if (tempStr === tempStr.toUpperCase()){ tempStr = tempStr.toLowerCase(); }
    tempStr.split('').forEach((char, inc) => {
      let tempChar = char;
      if (inc === 0 && char !== '1'){
        tempChar = tempChar.toString().toLowerCase();
      } else if (inc === 1 || inc === 2){
        tempChar = tempChar.toString().toLowerCase();
      }
      switch (tempChar) {
        case '0':
          correctedString += 'zero';
          break;
        case '1':
          correctedString += 'fir';
          break;
        case '2':
          correctedString += 'two';
          break;
        case '3':
          correctedString += 'three';
          break;
        case '4':
          correctedString += 'four';
          break;
        case '5':
          correctedString += 'five';
          break;
        case '6':
          correctedString += 'six';
          break;
        case '-':
          break;
        case '.':
          break;
        case '_':
          break;
        case ',':
          break;
        default:
          correctedString += tempChar;
      }
    });
    tempStr = correctedString;
    tempStr = tempStr.replace(/ /g, '');
    if (tempStr === 'seleneorders') { tempStr = 'seleneREO'; }
    if (tempStr === 'orderFile') { tempStr = 'shellpointServicing'; }
    if (tempStr === 'cmcbpoavmbpo') { tempStr = 'centralMortgage'; }
    if (tempStr === 'bc') { tempStr = 'goldmanSachs'; }
    return tempStr;
  } catch (err) {
    console.error(err);
  }
};
module.exports = {trimName};
