import Router from '@koa/router';
import authenticate from '../middleware/authenticate.js';
import koaBody from 'koa-body';
const router = new Router();

router.prefix('/api/auth'); // Create route prefix for this file
router.post('/', koaBody, authenticate); // POST /api/auth
export default router;
