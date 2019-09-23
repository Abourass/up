import jsonWebToken from 'koa-jwt';

export const jwt = jsonWebToken({secret: process.env.jsonSecret});
export default jwt;
