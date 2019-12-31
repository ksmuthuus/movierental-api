const express = require("express");
const app = express();

require("express-async-errors");
require('./routes')(app)
require('./db')()
require('./config')()
const logger = require('./logger')

module.exports = {
  app,
  logger
}