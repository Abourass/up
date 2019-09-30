const Router = require('@koa/router');
const router = new Router();
const {orderUpload} = require('../controllers/uploadController');
const ClientController = require('../controllers/clientController');
const jwt = require('../middleware/jwt.js');
const fs = require('fs');
const path = require('path');
const xlsxParser = require('../parsers/xlsxParser');
const xmlParser = require('../parsers/xmlParser');
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
    for (const file of files) {
      if (mimeTypes.spreadsheets.contains(file.mimetype)){
        await xlsxParser({bucket: file.bucket, key: file.key, clientID: clientID, clientName: client});
      } else if (file.mimetype === mimeTypes.xml){
        await xmlParser({bucket: file.bucket, key: file.key, clientID: clientID, clientName: client})
      } else if (file.mimetype === mimeTypes.text) {

      } else {

      }
    }
    ctx.body = await files;
  }catch (err) {ctx.body = err}
  });
module.exports = router;
