const XLSX = require('xlsx');

const convertToSheet = (json, outName) => {
  const workbook = XLSX.utils.json_to_sheet(json);
  XLSX.writeFile(workbook, `${outName}.xlsb`);
};
module.exports = {convertToSheet};
