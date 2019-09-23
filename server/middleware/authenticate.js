const jwt = require('jsonwebtoken');

const authenticate = ctx => {
  if (ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = { token: jwt.sign({role: 'admin'}, process.env.jsonSecret), message: 'Authenticated Successfully' };
  } else {
    ctx.status = 401;
    ctx.body = {message: 'Authentication Failed'}
  }
  return ctx;
};
module.exports = authenticate;
