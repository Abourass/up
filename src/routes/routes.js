const Router = require('@koa/router');
const koaBody = require('koa-body')({multipart:true});
const router = module.exports = new Router();
const formidable = require('formidable');
const util = require('util');

router.get('/', async(ctx, next) => { ctx.body = {"title": "Why are you even seeing this page?"} });

router.get('/upload', async(ctx, next) => {
  try {
    ctx.set('Content-type', 'text/html');
    ctx.body = `<form action="/upload" enctype="multipart/form-data" method="post">
    <input type="text" name="title"><br>
    <input type="file" name="upload" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>`;
  } catch (e) {console.error(e);}
});

router.post('/upload', koaBody, async(ctx, next) => {
  console.log('fields: ', ctx.request.body);
  console.log('Files: ', ctx.request.files);
  ctx.body = JSON.stringify(ctx.request.body, null, 2)
});
module.exports = router;
