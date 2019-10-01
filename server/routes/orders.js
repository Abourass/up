const Router = require('@koa/router');
const koaBody = require('koa-body');
const OrderController = require('../controllers/orderController');
const jwt = require('../middleware/jwt');
const router = new Router();

router.prefix('/api/orders'); // Create route prefix for this file

router.get('/', OrderController.find); // GET /api/client
router.post('/', jwt, koaBody, OrderController.add);  // POST /api/client -> This route is protected, call POST /api/auth to get the token

router.get('/:id', OrderController.findById); // GET /api/client/id
router.put('/:id', jwt, koaBody, OrderController.update); // PUT /api/client/id -> This route is protected, call POST /api/auth to get the token
router.delete('/:id', jwt, koaBody, OrderController.delete); // DELETE /api/client/id -> This route is protected, call POST /api/auth to get the token

module.exports = router;
