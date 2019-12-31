const express = require("express");
const app = express();

require("express-async-errors");
require('./logger')
require('./routes')(app)
require('./db')()
require('./config')()


module.exports = app