import XLSX from 'xlsx';

export const convertToSheet = (json, outName) => {
  const workbook = XLSX.utils.json_to_sheet(json);
  XLSX.writeFile(workbook, `${outName}.xlsb`);
};
export default {convertToSheet};
