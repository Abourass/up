'use strict';
// Set up Enivironmental Variables
require('dotenv').config();

function normalizePort(val) { // ========================================| Normalize a port into a number, string, or false
  const port = parseInt(val, 10);
  if (typeof port !== 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}
const port = normalizePort(process.env.PORT || '2777'); // Get port from environment
const mongo = {uri: process.env.mongoURI, config: {useNewUrlParser: true,  useUnifiedTopology: true}};
module.exports = {port, mongo};

