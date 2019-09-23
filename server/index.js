const Koa = require('koa'), koaBody = require('koa-body'), logger = require('koa-logger'), helmet = require('koa-helmet'),
  mongoose = require('mongoose'), {port, mongo} = require('./utils/port'), ip = require('ip'), {routing} = require('./routes');
const fs = require('fs'), path = require('path'), models = path.join(__dirname, './models');

mongoose.connect(mongo.uri, mongo.config).catch(err => console.error); // Create Database Connection

const app = module.exports = new Koa(); // Create Koa Server

// Load All Models eslint-disable-next-line global-require,import/no-dynamic-require,security/detect-non-literal-require,no-bitwise
fs.readdirSync('server/models').filter(file => ~file.search(/^[^.].*\.js$/)).forEach(file => require(path.join(models, file)));

app.use(logger()).use(koaBody()).use(helmet()); // Invoke Middleware

routing(app); // Start Routes

app.listen(port, () => { console.log(`Server is now running on http://${ip.address()}:${port}`);}); // Start the server
module.exports = app;
