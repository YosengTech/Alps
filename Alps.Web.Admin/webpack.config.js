// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
    case 'Production':

        module.exports = require('./config/webpack.prod')({ env: 'production' });
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev')({ env: 'development' });
}
