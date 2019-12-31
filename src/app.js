const logger = require('./startup/logger')
const app = require('./startup')


const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});