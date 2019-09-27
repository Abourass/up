const mimeTypes = require('../modules/mimeTypes');

const photoFilter = (req, file, cb) => {
  if (mimeTypes.images.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, WebP or SVG are allowed!'), false);
  }
};
const pdfSpreadFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/vnd.oasis.opendocument.spreadsheet' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PDF or Spreadsheets are allowed.'), false);
  }
};
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PDF are allowed!'), false);
  }
};
const documentFilter = (req, file, cb) => {
  if (file.mimetype === 'application/x-abiword' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/vnd.oasis.opendocument.text' || file.mimetype === 'application/rtf' || file.mimetype === 'application/vnd.ms-excel' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only XLS, XLSX, ABW, DOC, DOCX, RTF, or ODT are allowed!'), false);
  }
};
const developmentFilter = (req, file, cb) => {
  if (file.mimetype === 'text/css' || file.mimetype === 'text/html' || file.mimetype === 'text/javascript' || file.mimetype === 'application/json' || file.mimetype === 'application/xhtml+xml' || file.mimetype === 'text/x-sass' || file.mimetype === 'text/x-scss' || file.mimetype === 'text/x-handlebars-template' || file.mimetype === 'text/x-handlebars') {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only CSS, SASS, SCSS, HTML, XHTML, JS, JS Modules, JSON, Handlebars, and Handlebar's Templates are allowed!"), false);
  }
};

const orderFilter = (req, file, cb) => {
  if (mimeTypes.spreadsheets.includes(file.mimetype) || mimeTypes.xml === file.mimetype || mimeTypes.text === file.mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only XLS and XLSX are allowed!'), false);
  }
};
module.exports = {photoFilter, pdfSpreadFilter, pdfFilter, documentFilter, developmentFilter, orderFilter};
