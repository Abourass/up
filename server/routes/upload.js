import Router from '@koa/router';
import koaBody from 'koa-body';
import ClientController from '../controllers/client.js';
import jwt from '../middleware/jwt.js';
export const router = new Router();

router.prefix('/upload'); // Create route prefix for this file

router.get('/', async(ctx, next) => {
  try {
    ctx.set('Content-type', 'text/html');
    ctx.body = `<form action="/upload" enctype="multipart/form-data" method="post">
    <input type="text" name="title"><br>
    <input type="file" name="upload" multiple="multiple"><br>
    <input type="submit" value="Upload">
    </form>`;
  } catch (e) {console.error(e);}
});

router.post('/', koaBody, async(ctx, next) => {
  console.log(ctx.request.body);
  console.log('fields: ', ctx.request.body);
  console.log('Files: ', ctx.request.files);
  ctx.body = ctx.request.files;
});
export default router;
