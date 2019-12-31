const mongoose = require('mongoose')
const logger = require('./logger')
const config = require('config')

module.exports = function () {
  const url = config.get('mongoUri')
  console.log(url)
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info(`'MongoDB Connection Succeeded for ${url}`)
    })
    .catch(err => {
      logger.error('Failed to connect to DB ', err)
      process.exit(1)
    })
}