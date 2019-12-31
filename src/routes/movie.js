const express = require('express')
const {
    Movie,
    validate
} = require('../models/movie')
const {
    Genre
} = require('../models/genre')
const {
    returnError
} = require('../common/error')

const router = express.Router()

//GET All Movies

router.get('/', async (req, res) => {
    let movies = undefined
    try {
        movies = await Movie.find().sort('title')
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(200).send(movies)
})

//GET specific Movie
router.get('/:id', async (req, res) => {
    let movie = undefined
    try {
        movie = await Movie.findById(req.params.id)
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!movie) {
        returnError(res, 400, 'NotFoundException', 'Movie Not Available')
    }
    res.status(200).send(movie)
})

//POST Movie
router.post('/', async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error)
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details

    //Validate Ganre
    let genre = undefined
    try {
        genre = await Genre.findById(req.body.genreId)
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!genre) returnError(res, 404, 'NotFoundException', 'Genre Not Found')

    //Insert Movie
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    let addedMovie = undefined
    try {
        addedMovie = await movie.save()
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(201).send(addedMovie)
})

//PUT Genres
router.put('/:id', async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error) {
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details
    }

    //Validate Ganre
    let genre = undefined
    try {
        genre = await Genre.findById(req.body.genreId)
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!genre) returnError(res, 404, 'NotFoundException', 'Genre Not Found')

    let resultMovie = undefined
    try {
        resultMovie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, {
            new: true
        })
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }
    if (!resultMovie)
        returnError(res, 404, 'DataException', 'Movie Not Found')

    //Update Customer
    res.status(200).send(resultMovie)
})

//DELETE Generes
router.delete('/:id', async (req, res) => {
    var resultMovie = undefined
    try {
        resultMovie = await Movie.findByIdAndRemove(req.params.id)

    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!resultMovie) returnError(res, 404, 'DataException', 'Movie Not Found')

    //Remove genre
    res.status(200).send(resultMovie)

})

module.exports = router