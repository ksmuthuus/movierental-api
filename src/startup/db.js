const mongoose = require('mongoose')
const logger = require('./logger')
const config = require('config')

module.exports = function () {
  const url = config.get('db.uri')
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.debug(`'MongoDB Connection Succeeded for ${url}`)
    })
    .catch(err => {
      logger.error('Failed to connect to DB ', err)
      process.exit(1)
    })
}