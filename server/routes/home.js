import Router from '@koa/router';
export const router = new Router();

router.prefix('/'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {"title": "Why are you even seeing this page?"} }); // POST /api/auth
export default router;
