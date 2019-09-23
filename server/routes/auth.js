const Router = require('@koa/router'), authenticate = require('../middleware/authenticate');
const koaBody = require('koa-body')({multipart:true}), router = new Router();

router.prefix('/api/auth'); // Create route prefix for this file
router.post('/', koaBody, authenticate); // POST /api/auth
module.exports = router;
