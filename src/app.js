const express = require("express");
require("express-async-errors");
const app = express();
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/logging')()

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});