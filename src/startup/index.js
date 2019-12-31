const express = require("express");
const app = express();

require("express-async-errors");
require('./config')();
require('./routes')(app);
require('./db')();
require('./prod')(app);


module.exports = app