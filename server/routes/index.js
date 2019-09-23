const {routesLoader} = require('../utils/routesLoader');

const routing = (app) => {
  routesLoader(`${__dirname}`).then(files => {
    files.forEach(route => {
      app.use(route.routes()).use(
        route.allowedMethods({
          throw: true
        })
      )
    })
  })
};
module.exports = {routing};
