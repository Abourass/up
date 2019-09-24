const Router = require('@koa/router');
const authenticate = require('../middleware/authenticate.js');
const koaBody = require('koa-body');
const router = new Router();

router.prefix('/api/auth'); // Create route prefix for this file
router.post('/', koaBody, authenticate); // POST /api/auth
module.exports = router;
