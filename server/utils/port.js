function normalizePort(val) { // ========================================| Normalize a port into a number, string, or false
  const port = parseInt(val, 10);
  if (typeof port !== 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}

export const port = normalizePort(process.env.PORT || '2777'); // Get port from environment
export const mongo = {uri: process.env.mongoURI.toString(), config: {useNewUrlParser: true,  useUnifiedTopology: true}};
export default {port, mongo};

