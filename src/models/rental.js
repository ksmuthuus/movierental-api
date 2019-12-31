const mongoose = require('mongoose')
const Joi = require('joi')


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
})

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    rentalRate: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

const validate = (rental) => {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(rental, schema)
}

module.exports = {
    rentalSchema,
    Rental,
    validate
}