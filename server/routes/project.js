const Router = require('@koa/router');
const koaBody = require('koa-body');
const ProjectController = require('../controllers/projectController');
const jwt = require('../middleware/jwt');
const router = new Router();

router.prefix('/api/project'); // Create route prefix for this file

router.get('/', ProjectController.find); // GET /api/client
router.post('/', jwt, koaBody, ProjectController.add);  // POST /api/client -> This route is protected, call POST /api/auth to get the token

router.put('/:id', jwt, koaBody, ProjectController.update); // PUT /api/client/id -> This route is protected, call POST /api/auth to get the token
router.delete('/:id', jwt, koaBody, ProjectController.delete); // DELETE /api/client/id -> This route is protected, call POST /api/auth to get the token

module.exports = router;
