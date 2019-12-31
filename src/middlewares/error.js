const winston = require("winston");
module.exports = function (ex, req, res, next) {
  //Log the error
  winston.error(ex.message, ex);
  if (ex.message.toLowerCase().includes('not found') || ex.message.toLowerCase().includes('invalid') || ex.message.toLowerCase().includes('validation')) {
    res.status(400).send({
      error: ex.message
    })
  }

  if (ex.message.toLowerCase().includes('access denied')) {
    res.status(401).send({
      error: ex.message
    })
  }

  res.status(500).send({
    error: ex.message
  });
};