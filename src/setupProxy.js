const proxy = require("http-proxy-middleware");
require('dotenv').config()

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:4762' }))
    app.use(proxy('/auth', { target: 'http://localhost:4762' }))
  }