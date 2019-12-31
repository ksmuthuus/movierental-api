const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    id: this._id,
    isAdmin: this.isAdmin
  }, config.get('jwtPrivateKey'))
  return token
}

const User = mongoose.model('User', userSchema)


const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(3).required().alphanum(),
    email: Joi.string().min(8).max(255).required().email(),
    password: Joi.string().min(8).max(25).required(),
    isAdmin: Joi.boolean()
  }
  return Joi.validate(user, schema)
}

module.exports = {
  User: User,
  validate: validateUser
}