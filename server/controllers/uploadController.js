const AWS = require('aws-sdk');
const multer = require('@koa/multer');
const multerS3 = require('multer-s3');
const ClientController = require('./clientController');
const {spreadsheetFilter} = require('../filters/fileFilters');
const mimeTypes = require('../modules/mimeTypes');

AWS.config.update({
  secretAccessKey: process.env.AWS_S3_Secret_Access_Key,
  accessKeyId: process.env.AWS_S3_Access_Key_ID,
  region: 'us-west-1',
});
const s3 = new AWS.S3();

const orderUpload = multer({
  spreadsheetFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'veritasorders',
    cacheControl: 'max-age=31536000',
    acl: 'public-read',
    contentDisposition: 'attachment',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: async function(request, file, cb) {
      cb(null, {
        // user: req.user.fullNamePreferred,
        clientID: await ClientController.findByToken(request, 'id'),
        createdOn: new Date().toLocaleString(),
        originalName: file.originalname,
      });
    },
    key: async function(request, file, cb) {
      const client = await ClientController.findByToken(request, 'name');
      if (mimeTypes.spreadsheets.includes(file.mimetype)){
        if (file.mimetype === 'application/vnd.ms-excel') {
          cb(null, `${client}-${new Date().getUTCMilliseconds()}${Math.floor((Math.random() * 250) + 1)}.xls`);
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          cb(null, `${client}-${new Date().getUTCMilliseconds()}${Math.floor((Math.random() * 250) + 1)}.xlsx`);
        }
      } else if (file.mimetype === mimeTypes.text) {
        cb(null, `${client}-${new Date().getUTCMilliseconds()}${Math.floor((Math.random() * 250) + 1)}.txt`);
      } else if (file.mimetype === mimeTypes.xml) {
        cb(null, `${client}-${new Date().getUTCMilliseconds()}${Math.floor((Math.random() * 250) + 1)}.xml`);
      } else {
        return false;
      }
    },
  }),
});
module.exports = {orderUpload};
