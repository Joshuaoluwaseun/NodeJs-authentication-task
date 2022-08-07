const Joi = require('joi');
const mongoose = require('mongoose');

async function mongooseConnect(){
    await mongoose.connect('mongodb://localhost:27017/flightdb')
}

mongooseConnect()

const Flight = mongoose.model('Flight', new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    place: {
        type: String,
        required: true  
    }
}));

function validateFlight(flight) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(10).required(),
        price: Joi.number().min(3).max(10000).required(),
        place: Joi.string().min(3).max(10).required() 
    })
    return schema.validate(flight);
}

exports.Flight = Flight;
exports.validate = validateFlight;