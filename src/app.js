const logger = require('./startup/logger')
const app = require('./startup')


const port = process.env.PORT;
app.listen(port, () => {
  logger.debug(`Listening on port ${port}`);
});