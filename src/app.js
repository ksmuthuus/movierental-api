const express = require("express");
require("express-async-errors");
const app = express();
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
const logger = require('./startup/logger')

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});