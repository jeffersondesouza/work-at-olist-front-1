const devConfig = require('./webpack.config.dev.js');
const prodConfig = require('./webpack.config.prod.js');

let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = prodConfig;
    break;
  default:
    config = devConfig;
    break;
}

module.exports = config;
