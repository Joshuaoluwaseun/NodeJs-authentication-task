require('dotenv').config()
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1023
    },
    isadmin: {
        type: Boolean,
        default: 0
    },
    isManager: {
        type: Boolean,
        default: 0
    },
    isStaff: {
        type: Boolean,
        default: 0
    },
    isUser: {
        type: Boolean,
        default: 0
    }
},{timestamps: true})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin,
        isManager: this.isManager,
        isStaff: this.isStaff,
        isUser: this.isUser
        }, process.env.todo_jwtPrivatekey, { expiresIn: 8000})
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(50).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser ;