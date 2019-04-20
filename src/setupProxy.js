const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/.netlify/functions/', {
    target: 'http://localhost:34567/',
    pathRewrite: {
      '^/\\.netlify/functions': ''
    }
  }));
};
