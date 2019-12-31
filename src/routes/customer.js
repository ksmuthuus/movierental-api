const express = require('express')
const {
    Customer,
    validate
} = require('../models/customer')
const {
    returnError
} = require('../common/error')

const router = express.Router()

//GET All Generas

router.get('/', async (req, res) => {
    let customers = undefined
    try {
        customers = await Customer.find().sort('name')
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(200).send(customers)
})

//GET specific Generas
router.get('/:id', async (req, res) => {
    let customer = undefined
    try {
        customer = await Customer.findById(req.params.id)
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!customer) {
        returnError(res, 400, 'DataException', 'Genre Not Available')
    }
    res.status(200).send(customer)
})

//POST Genres
router.post('/', async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error) {
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details
    }

    //Insert Genre
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    let addedCustomer = undefined
    try {
        addedCustomer = await customer.save()
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    res.status(201).send(addedCustomer)
})

//PUT Genres
router.put('/:id', async (req, res) => {
    //Validate payload
    const validated = validate(req.body)
    if (validated.error) {
        returnError(res, 400, 'ValidationException', validated.error.details[0].message) //TO DO enumerate details
    }


    let resultCustomer = undefined
    try {
        resultCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true
        })
    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }
    if (!resultCustomer)
        returnError(res, 404, 'DataException', 'Customer Not Found')

    //Update Customer
    res.status(200).send(resultCustomer)
})

//DELETE Generes
router.delete('/:id', async (req, res) => {
    var resultCustomer = undefined
    try {
        resultCustomer = await Customer.findByIdAndRemove(req.params.id)

    } catch (err) {
        returnError(res, 400, 'StorageException', err.message)
    }

    if (!resultCustomer) returnError(res, 404, 'DataException', 'Customer Not Found')

    //Remove genre
    res.status(200).send(resultCustomer)

})

module.exports = router