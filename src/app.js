const logger = require('./startup/logger')
const app = require('./startup')


const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  logger.debug(`Listening on port ${port}`);
});