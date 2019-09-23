import XLSX from 'xlsx';
import path from 'path';

export const convertToJSON = async(file) => {
  const workbook = await XLSX.readFile(path.join('assets', file)),
    worksheet = workbook.Sheets[workbook.SheetNames[0]]; /* return json array of object (Each order is an object within this array) */
  return XLSX.utils.sheet_to_json(worksheet);
};
export default {convertToJSON};
