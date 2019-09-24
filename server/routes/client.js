const Router = require('@koa/router');
const koaBody = require('koa-body');
const ClientController = require('../controllers/client.js');
const jwt = require('../middleware/jwt.js');
const router = new Router();

router.prefix('/api/client'); // Create route prefix for this file

router.get('/', ClientController.find); // GET /api/client
router.post('/', jwt, koaBody, ClientController.add);  // POST /api/client -> This route is protected, call POST /api/auth to get the token

router.get('/:id', ClientController.findById); // GET /api/client/id
router.put('/:id', jwt, koaBody, ClientController.update); // PUT /api/client/id -> This route is protected, call POST /api/auth to get the token
router.delete('/:id', jwt, koaBody, ClientController.delete); // DELETE /api/client/id -> This route is protected, call POST /api/auth to get the token

module.exports = router;
