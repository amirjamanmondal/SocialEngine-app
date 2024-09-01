const monggose = require('mongoose')
// const Image = require('../imageModel/image')

const registerSchema = new monggose.Schema({
    name: {
        type: String,
        minlength: 6,

    },
    userName: {
        type: String,
        required: true,
        minlength: 6,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        default: 'male'
    },
    gallery: {
        type: Number,
        required: true,
        default: 0
    },
    avatar: {
        type: String,
        default: "https://shorturl.at/5JjHP"

    },
    messages: {
        type: Array,
    }

}, { timestamps: true })

const Register = monggose.model('Register', registerSchema)

module.exports = Register;