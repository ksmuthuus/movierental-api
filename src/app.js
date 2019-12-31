const logger = require('./startup/logger')
const app = require('./startup')
const config = require('config')


const port = process.env.PORT || config.get('web.port') || 3000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});