const logger = require('../startup/logger');


module.exports = function (ex, req, res, next) {
  //Log the error
  logger.error(ex.message, ex);
  if (ex.message.toLowerCase().includes('invalid') || ex.message.toLowerCase().includes('validation')) {
    return res.status(400).send({
      error: ex.message
    })
  }

  if (ex.message.toLowerCase().includes('not found')) {
    return res.status(404).send({
      error: ex.message
    })
  }

  if (ex.message.toLowerCase().includes('access denied')) {
    return res.status(401).send({
      error: ex.message
    })
  }

  return res.status(500).send({
    error: ex.message
  });
};