const koaBody = require('koa-body');
const Koa = require('koa');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const ip = require('ip');
const routing = require('./routes/index.js');
const {port, mongo} = require('./utils/port.js');
mongoose.connect(mongo.uri, mongo.config).catch(err => console.error); // Create Database Connection

const app = new Koa(); // Create Koa Server

app.use(logger()).use(koaBody()).use(helmet()); // Invoke Middleware

routing(app); // Start Routes

app.listen(port, () => { console.log(`Server is now running on http://${ip.address()}:${port}`);}); // Start the server
module.exports = app;
