const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token)
    throw new Error('Access denied! Missing Auth Token header: x-auth-token')

  const decoded = jwt.verify(token, config.get('app.jwtPrivateKey'))
  req.user = decoded
  next()
}