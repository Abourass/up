const Router = require('@koa/router');
const router = new Router();
const {orderUpload} = require('../controllers/uploadController');
const ClientController = require('../controllers/client');
const jwt = require('../middleware/jwt.js');
const fs = require('fs');
const path = require('path');

router.prefix('/upload'); // Create route prefix for this file

router.get('/', async(ctx, next) => {
  try {
    ctx.set('Content-type', 'text/html');
    const url = path.join(__dirname, '../', '../', 'html', 'uploadForm.html');
    const html = fs.readFileSync(url);
    ctx.body = await html
  } catch (e) {console.error(e);}
});

router.post('/', jwt, orderUpload.array('upload', 20), async ctx => {
  try {
    const client = await ClientController.findByToken(ctx, 'name');
    ctx.body = 'Successfully uploaded ' + ctx.files.length + ' files for ' + client + '!';
  }catch (err) {ctx.body = err}
  });
module.exports = router;
