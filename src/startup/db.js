const mongoose = require('mongoose')
const logger = require('./logger')

module.exports = function () {
  const url = "mongodb://localhost:27017/MovieRental";
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info('MongoDB Connection Succeeded!')
    })
}