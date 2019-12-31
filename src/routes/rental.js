const express = require("express");
const {
    Rental,
    validate
} = require("../models/rental");
const {
    Movie
} = require("../models/movie");
const {
    Customer
} = require("../models/customer");
const {
    returnError
} = require("../common/error");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();

Fawn.init(mongoose);

//GET All Rentals

router.get("/", async (req, res) => {
    let rentals = undefined;
    try {
        rentals = await Rental.find().sort("-dateOut");
    } catch (err) {
        returnError(res, 400, "StorageException", err.message);
    }

    res.status(200).send(rentals);
});

//POST Rental
router.post("/", async (req, res) => {
    //Validate payload
    const validated = validate(req.body);
    if (validated.error)
        returnError(
            res,
            400,
            "ValidationException",
            validated.error.details[0].message
        ); //TO DO enumerate details

    //Validate Customer
    let customer = undefined;
    try {
        customer = await Customer.findById(req.body.customerId);
    } catch (err) {
        returnError(res, 400, "StorageException", err.message);
    }
    if (!customer)
        returnError(res, 404, "NotFoundException", "Customer Not Found");

    //Validate Movie
    let movie = undefined;
    try {
        movie = await Movie.findById(req.body.movieId);
    } catch (err) {
        returnError(res, 400, "StorageException", err.message);
    }
    if (!movie) returnError(res, 404, "NotFoundException", "Movie Not Found");

    //Check Stock
    if (movie.numberInStock <= 0)
        returnError(res, 400, "OutOfStockException", "Movie Not Avialable");

    //Insert Rental
    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    //   let addedRental = undefined;
    //   try {
    //     addedRental = await rental.save();
    //     movie.numberInStock = movie.numberInStock - 1;
    //     await movie.save();
    //   } catch (err) {
    //     returnError(res, 400, "StorageException", err.message);
    //   }

    try {
        new Fawn.Task()
            .save("rentals", rental)
            .update("movies", {
                _id: movie._id
            }, {
                $inc: {
                    numberInStock: -1
                }
            })
            .run();
        res.status(201).send(rental);
    } catch (err) {
        returnError(res, 500, "InternalException", err.message);
    }

});

module.exports = router;