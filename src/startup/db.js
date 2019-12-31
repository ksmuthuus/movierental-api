const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
  const url = "mongodb://localhost:27017/MovieRental";
  mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      winston.info('MongoDB Connection Succeeded!')
    })
}