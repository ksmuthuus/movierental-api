const mongoose = require('mongoose')
const Joi = require('joi')


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    }
})


const Genre = mongoose.model('Genre', genreSchema)


const validate = (genre) => {
    const schema = {
        name: Joi.string().min(3).required().alphanum()
    }
    return Joi.validate(genre, schema)
}

module.exports = {
    genreSchema,
    Genre,
    validate
}