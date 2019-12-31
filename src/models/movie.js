const mongoose = require('mongoose')
const Joi = require('joi')
const {
    genreSchema
} = require('./genre')


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255

    }
})

const Movie = mongoose.model('Movie', movieSchema)

const validate = (movie) => {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    }
    return Joi.validate(movie, schema)
}

module.exports = {
    movieSchema,
    Movie,
    validate
}