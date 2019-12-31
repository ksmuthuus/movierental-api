const winston = require('winston');
//require('winston-mongodb');
// require('express-async-errors');

// module.exports = function () {
// winston.handleExceptions(
//   new winston.transports.Console({
//     colorize: true,
//     prettyPrint: true
//   }),
//   new winston.transports.File({
//     filename: 'uncaughtExceptions.log'
//   }));

// process.on('unhandledRejection', (ex) => {
//   throw ex;
// });

// winston.add(winston.transports.File, {
//   filename: 'logfile.log'
// });
// winston.add(winston.transports.MongoDB, {
//   db: 'mongodb://localhost/vidly',
//   level: 'info'
// });
// }

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: 'movierental-api'
  },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'log/combined.log'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'log/exceptions.log'
    })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

//Workaround for unhandled Rejection
process.on('unhandledRejection', (ex) => {
  throw ex;
});


module.exports = logger