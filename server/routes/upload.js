const Router = require('@koa/router');
const router = new Router();
const {orderUpload} = require('../controllers/uploadController');
const ClientController = require('../controllers/clientController');
const jwt = require('../middleware/jwt.js');
const fs = require('fs');
const path = require('path');
const xlsxParser = require('../parsers/xlsxParser');
const xmlParser = require('../parsers/xmlParser');
const pipeParser = require('../parsers/pipeParser');
const s3Controller = require('../controllers/s3Controller');
const mimeTypes = require('../modules/mimeTypes');

router.prefix('/upload'); // Create route prefix for this file

router.get('/', async(ctx, next) => {
  try {
    ctx.set('Content-type', 'text/html');
    const url = path.join(__dirname, '../', 'views', 'html', 'uploadForm.html');
    const html = fs.readFileSync(url);
    ctx.body = await html
  } catch (e) {console.error(e);}
});

router.post('/', jwt, orderUpload.array('upload', 20), async ctx => {
  try {
    const client = await ClientController.findByToken(ctx, 'name');
    const clientID = await ClientController.findByToken(ctx, '_id');
    const files = await ctx.files;
    console.log(files.length);
    const timeout = async(timeInMs, cb) => {
      setTimeout(async function() {
        cb();
      }, parseInt(length, 10))
    };

    for (const file of files) {
      if (mimeTypes.spreadsheets.includes(file.mimetype)){
        await timeout(5000, await xlsxParser({bucket: file.bucket, key: file.key, clientID: clientID, clientName: client}))
      } else if (file.mimetype === mimeTypes.xml){
        const utf8File = s3Controller({bucket: file.bucket, key: file.key});
        await timeout(5000, await xmlParser({file: utf8File, clientID: clientID, clientName: client}))
      } else if (file.mimetype === mimeTypes.text) {
        await timeout(5000, await pipeParser({bucket: file.bucket, key: file.key, clientID: clientID, clientName: client}))
      } else {
        console.log('No parser for this file type, sending a link to the file to be emailed to orders')
      }
    }
    ctx.body = await files;
  }catch (err) {ctx.body = err}
  });
module.exports = router;
