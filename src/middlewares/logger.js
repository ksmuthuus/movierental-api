const logger = ((req, res, next) => {
    console.log('Logging Middleware!')
    next()
})
module.exports = logger