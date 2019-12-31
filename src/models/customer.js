const mongoose = require('mongoose');
const Joi = require('joi');

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
});

const Customer = mongoose.model('Customer', customerSchema);

const validate = (customer) => {
    const schema = {
        name: Joi.string().min(3).max(15).required().alphanum(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(15)
    }
    return Joi.validate(customer, schema)
};

module.exports = {
    customerSchema,
    Customer,
    validate
}