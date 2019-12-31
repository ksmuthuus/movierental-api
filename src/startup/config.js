const config = require('config');

module.exports = function () {
  if (!config.has('app.jwtPrivateKey') && !config.has('db.uri')) {
    throw new Error('FATAL ERROR: Application configuration not defined properly!');
  }
}