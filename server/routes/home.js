const Router = require('@koa/router'), router = new Router(), authenticate = require('../middleware/authenticate');
const koaBody = require('koa-body')({multipart:true});

router.prefix('/'); // Create route prefix for this file
router.get('/', async(ctx, next) => { ctx.body = {"title": "Why are you even seeing this page?"} }); // POST /api/auth
module.exports = router;
